# Analysis of Factors Affecting Used Car Prices

## 1. Objective

The objective of this project is to understand which vehicle characteristics are associated with used car selling prices.

The analysis focuses on vehicle age, mileage, brand, fuel type, transmission type, engine size and maximum power.

## 2. Dataset

The analysis uses a CarDekho used-car dataset containing information about vehicle specifications and selling prices.

The dataset contains 15,411 records initially. After removing duplicate records, invalid seat values and one extreme mileage value, 15,241 records were used for the analysis.

## 3. Methodology

The dataset was first inspected for missing values, duplicate records and unusual values.

The analysis was then divided into five research questions:

1. Does car age affect price?
2. Does mileage affect price?
3. Does brand affect price?
4. Do fuel and transmission affect price?
5. Which car specifications are linked to price?

Python was used for data cleaning, calculations and visualizations using Pandas, Matplotlib and Seaborn.

## 4. Results

### 4.1 Car Age

Newer cars generally have higher selling prices. The median price was ₹755,000 for cars aged 0–3 years, compared with ₹180,000 for cars aged 13–20 years.

### 4.2 Mileage

Mileage has a weak negative relationship with selling price, with a correlation of -0.101.

The median price generally decreases as mileage increases. Cars with less than 30,000 km had a median price of ₹650,000, compared with ₹500,000 for cars with more than 200,000 km.

### 4.3 Brand

Brand shows large differences in selling prices. Premium brands such as Land Rover, Jaguar, BMW, Mercedes-Benz and Audi had much higher median prices than brands such as Maruti, Hyundai and Renault.

### 4.4 Fuel and Transmission

Diesel cars had a higher median price than petrol, CNG and LPG cars. Electric cars had the highest median price, but only four electric cars were present in the dataset.

Automatic cars had a median price of ₹1,050,000, compared with ₹500,000 for manual cars.

### 4.5 Engine and Maximum Power

Engine size had a moderate positive correlation with selling price of 0.586.

Maximum power had the strongest numerical relationship with selling price, with a correlation of 0.751.

## 5. Key Insights

- Vehicle age is negatively associated with selling price.
- Higher mileage is generally associated with lower prices.
- Brand has a large influence on typical selling prices.
- Automatic cars generally have higher selling prices than manual cars.
- Max power has the strongest correlation with selling price among the numerical specifications examined.
- Some categories have relatively few observations, so their results should be interpreted carefully.

## 6. Conclusion

Used car prices are associated with several vehicle characteristics rather than a single factor.

The analysis shows clear differences based on age, mileage, brand, fuel type, transmission, engine size and maximum power. Among the numerical specifications examined, maximum power has the strongest relationship with selling price.