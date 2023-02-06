from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy import Column, Integer, \
    String, Boolean, Float, ForeignKey

Base = declarative_base()

class Dishes(Base):
    
    # Creates a new table and assigns new columns
    __tablename__ = 'dishes'
    id = Column(Integer, primary_key=True, autoincrement=True)
    name = Column(String, nullable=False)
    description = Column(String, nullable=False)
    allergens = Column(String, nullable=True)
    kcal = Column(Integer, nullable=False)
    course = Column(String, nullable=False) # Starter, main, dessert, side, drink
    price = Column(Float, nullable=False)
    vegetarian = Column(Boolean, nullable=False)
    vegan = Column(Boolean, nullable=False)

class Address(Base):
    __tablename__ = 'addresses'
    id = Column(Integer, primary_key=True, autoincrement=True)
    line1 = Column(String, nullable=False)
    line2 = Column(String, nullable=True)
    building_number = Column(String, nullable=True)
    city = Column(String, nullable=False)
    state_or_province = Column(String, nullable=False)
    country = Column(String, nullable=False)
    postcode_zip = Column(String, nullable=False) 

class Employees(Base):
    __tablename__ = 'employees'
    id = Column(Integer, primary_key=True, autoincrement=True)
    first_name = Column(String, nullable=False)
    last_name = Column(String, nullable=False)
    email = Column(String, nullable=False)
    phone = Column(String, nullable=False)
    address_id = Column(Integer, ForeignKey('addresses.id'), nullable=False)
    currently_employed = Column(Boolean, nullable=False)
    
