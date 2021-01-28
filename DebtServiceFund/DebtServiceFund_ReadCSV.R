library("tidyverse")
library("dplyr")
setwd("../../../../")
setwd("./Desktop/code/cle-budget/DebtServiceFund/")

#Import data by reading each excel page as a csv and saving it to a dataframe
data_debt_service_expenditure = read_csv('DebtServiceFund_DebtServiceExpenditures_pg455-56.csv')
data_unvoted_taxes = read_csv('DebtServiceFund_UnvotedTaxSupportedOblig_pg457.csv')
data_debt_service_revenue = read_csv('DebtServiceFund_DebtServiceRevenues_pg454.csv')
data_revenue_bond = read_csv('DebtServiceFund_RevenueBondDebtSrvce_pg452-453.csv')

#The different tables in this fund don't really combine into 1, so left them as is. 