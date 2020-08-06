import bs4 as bs
import pickle
import pandas as pd
from PIL import Image
from io import BytesIO
import requests
import os

def grab_locations():

    region_html = requests.get('https://www.atlasobscura.com/destinations')
    region_html = bs.BeautifulSoup(region_html.text, 'lxml')
    region_items = region_html.findAll('li', {'class': 'global-region-item'})

    countries = []

    for region in region_items:

        country_list = region.find('div', {'class': 'country-links'})
        country_list = country_list.findAll('a', {'class': 'non-decorated-link'})

        [countries.append(country.text) for country in country_list]

    print(countries)
    print('\n')
    locations = []

    for X, country in enumerate(countries):

        success = True
        i = 1

        print(country.upper() + '\n')

        while success:

            country = country.replace(' ', '-')
            country = country.replace('.', '')
            country = country.replace('(', '')
            country = country.replace(')', '')
            country = country.replace('ç', 'c')
            country = country.replace('é', 'e')
            country = country.replace('Principe', 'principe-119469e9-c3da-46a1-bafd-134e1031671b')

            country_html = requests.get('https://www.atlasobscura.com/things-to-do/' + country + '/places?page=' + str(i))
            country_html = bs.BeautifulSoup(country_html.text, 'lxml')

            extra_page = country_html.find('h2', {'class': 'title-lg'})

            if extra_page is not None:
                if extra_page.text == 'Something went wrong on our end.':
                    break

            request_rejection = country_html.find('p')
            request_rejection2 = country_html.find('pre')

            if request_rejection is not None:
                if request_rejection.text.replace('\n', '') == 'Retry later':
                    continue

            if request_rejection2 is not None:
                if request_rejection2.text.replace('\n', '') == 'Retry later':
                    continue

            destination_list = country_html.find('section', {'data-component-type': 'destination-grid-places'})

            if destination_list is None:
                continue

            print('page: ' + str(i))

            destination_rows = destination_list.findAll('div', {'class': 'row'})

            for row in destination_rows:
                destinations = row.findAll('a', {'class': 'Card'})

                for destination in destinations:
                    try:
                        longitude = destination['data-lng']
                        latitude = destination['data-lat']

                        image_src = destination.find('img', {'class': 'Card__img'})['src']
                        photo = Image.open(BytesIO(requests.get(image_src).content))

                        name = destination.find('h3', {'class': 'Card__heading'}).find('span').text

                        description = destination.find('div', {'class': 'Card__content'}).text.replace('\n', '')

                        locations.append([name, description, longitude + ', ' + latitude, photo])

                        print(name + ' - ' + '(' + longitude + ', ' + latitude + ')')
                    except:
                        continue

            print('\n\n')

            i += 1

    location_df = pd.DataFrame(data=tuple(locations), columns=['Name', 'Description', 'LngLat', 'photo'])
    location_df.to_csv('location_data.csv')

    with open('location_data.pickle', 'wb') as handle:
        pickle.dump(location_df, handle)

    return location_df


def populate_db(location_df):

    






if __name__ == '__main__':

    if os.path.isfile('location_data.pickle'):
        with open('location_data.pickle', 'rb') as handle:
            location_df = pickle.load(handle)
        populate_db(location_df)
    else:
        populate_db(grab_locations())
