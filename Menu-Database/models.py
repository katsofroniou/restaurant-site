from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy import Column, Integer, String, Boolean

Base = declarative_base()

class oaxaca(Base):
    
    # Creates a new table and assigns new columns
    __tablename__ = 'dishes'
    id = Column(Integer, primary_key=True, autoincrement=True)
    name = Column(String)
    description = Column(String)
    allergens = Column(String)
    kcal = Column(Integer)
    course = Column(String) # Starter, main, dessert, side, drink
    vegan = Column(Boolean)
    
    def __repr__(self):
        return "<MenuItems(id='{}', name='{}', description='{}', \
            allergens='{}', kcal='{}', course='{}', vegan='{}')>"\
                .format(self.id, self.name, self.description, \
                    self.allergens, self.kcal, self.course, self.vegan)
                