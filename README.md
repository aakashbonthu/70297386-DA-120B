# Analysis of Factors Affecting Used Car Prices

## About the Project

Buying a used car is not just about choosing a model. The price can change a lot depending on things like the car's age, mileage, brand and specifications.

In this project, I used a used-car dataset from CarDekho to explore which factors are most closely related to the selling price of a car.

The main focus is on finding patterns in the data rather than building a price prediction model.

## Questions I Wanted to Answer

The analysis is based around five main questions:

1. Does the age of a car affect its selling price?
2. Does higher mileage generally mean a lower price?
3. How different are selling prices between brands?
4. Do fuel type and transmission type affect price?
5. Are engine size and maximum power related to selling price?

## Dataset

The dataset contains information about used cars, including:

- Car name and brand
- Vehicle age
- Kilometers driven
- Fuel type
- Transmission type
- Engine size
- Maximum power
- Mileage
- Number of seats
- Selling price

The original dataset contains 15,411 records and 14 columns.

## Data Cleaning

Before starting the analysis, I checked the dataset for missing values, duplicate records and unusual values.

The following cleaning steps were carried out:

- Removed duplicate records
- Removed two cars with an invalid seat value of 0
- Removed one extreme mileage value of 3.8 million km
- Kept other unusual but possible values instead of removing them automatically

After cleaning, 15,241 records were used for the analysis.

## Analysis

The analysis was carried out in a Jupyter Notebook using Python.

For each research question, I used simple comparisons, correlations and visualizations to look for patterns in the data.

Some of the main observations were:

- Newer cars generally have higher selling prices.
- Higher mileage is generally associated with lower prices.
- Selling prices vary considerably between brands.
- Automatic cars have a higher median selling price than manual cars.
- Max power has a strong positive relationship with selling price.
- Engine size also has a positive relationship with selling price.

## Tools Used

- Python
- Pandas
- NumPy
- Matplotlib
- Seaborn
- Jupyter Notebook

