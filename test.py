import re
price_dict = {'#buyCursor': 'Cursor - 15', '#buyGrandma': 'Grandma - 100', '#buyFactory': 'Factory - 500', '#buyMine': 'Mine - 2000', 'buyShipment': 'Shipment - 7000', '#buyAlchemy lab': 'Alchemy lab - 50000', 'buyPortal': 'Portal - 1000000', '#buyTime machine': 'Time machine - 123456789'}
final_price = {key:int( "".join((re.findall(r'\d+', value)))) for (key, value) in price_dict.items() }
print(final_price)
print(price_dict)