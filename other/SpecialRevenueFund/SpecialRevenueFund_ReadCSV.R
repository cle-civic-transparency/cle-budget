library("tidyverse")
library("dplyr")
setwd("../../../../")
setwd("./Desktop/code/cle-budget/SpecialRevenueFund/")

#salaries
#Contractual Services
#Revenue
#interfund subsidies
#capital outlay
#debt services

#Import data by reading each excel page as a csv and saving it to a dataframe
df_stadium = read_csv('SpecialRevenueFunds_ClevelandStadium_pg374.csv')
df_income_tax = read_csv('SpecialRevenueFunds_RestrictedIncomeTax_pg366.csv')
df_schools = read_csv('SpecialRevenueFunds_SchoolsRec&Cultural_pg373.csv')
df_construction = read_csv('SpecialRevenueFunds_StConstruMntn&Repair_pg368-70.csv')

#Get the 2017 Values for the salaries section
#sal_2017_stadium <- df_stadium[1:10,1:2] 
#sal_2017_tax <- df_income_tax[1:10,1:2] 
#sal_2017_schools <- df_schools[1:10,1:2]
sal_2017_const <- df_construction[2:11,1:2]

sal_2017 <- sal_2017_const

names(sal_2017)[1] <- '2017 Contractual Services'
names(sal_2017)[2] <- 'Construction'

#Get the 2017 Values for the Contractual services section
cservs_2017_stadium <- df_stadium[2:4,1:2]
#cservs_2017_tax <- df_income_tax[1:10,1:2]
cservs_2017_schools <- df_schools[2,1:2]
cservs_2017_const <- df_construction[40:45,1:2]

cservs_2017 <- Reduce(function(r_x,r_y) merge(x=r_x, y=r_y, by=1, all=TRUE),
                   list(cservs_2017_stadium,
                        cservs_2017_schools,
                        cservs_2017_const))

names(cservs_2017)[1] <- '2017 Contractual Services'
names(cservs_2017)[2] <- 'Stadium'
names(cservs_2017)[3] <- 'Schools'
names(cservs_2017)[4] <- 'Construction'

#Get the 2017 Values for the revenue section
#Get the 2017 Values for the interfund section
#Get the 2017 Values for the capital overlay section
#Get the 2017 Values for the debt services section
#Construction has a lot of sections the others don't have


