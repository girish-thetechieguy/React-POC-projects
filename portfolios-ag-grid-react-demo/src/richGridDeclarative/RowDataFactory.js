import RefData from './RefData';

export default class RowDataFactory {

    createRowData() {
        const rowData = [];

        for (let i = 0; i < 200; i++) {
            const countryData = RefData.COUNTRIES[i % RefData.COUNTRIES.length];
            rowData.push({
                name: RefData.FIRST_NAMES[i % RefData.FIRST_NAMES.length] + ' ' + RefData.LAST_NAMES[i % RefData.LAST_NAMES.length],
                skills: {
                    adv1: Math.random() < 0.4,
                    adv2: Math.random() < 0.4,
                    adv3: Math.random() < 0.4,
                    adv4: Math.random() < 0.4,
                    adv5: Math.random() < 0.4
                },
                dob: RefData.DOB[i % RefData.DOB.length],
                address: RefData.ADDRESSES[i % RefData.ADDRESSES.length],
                managementFees: this.createRandomMangementFees(),
                years: Math.round(Math.random() * 100),
                grownthProficiency: Math.round(Math.random() * 100),
                country: countryData.country,
                continent: countryData.continent,
                language: countryData.language,
                minbudget: this.createRandomMinBudget(),
                maxbudget: this.createRandomMaxBudget()
            });
        }

        return rowData;
    }

    createRandomMinBudget() {
        let result = 'HKD ';
        for (let i = 1; i < 2; i++) {
            result += Math.round(Math.random() * 10);
            result += 'M';
        }
        return result;
    }

    createRandomMaxBudget() {
        let result = 'HKD ';
        for (let i = 3; i < 4; i++) {
            result += Math.round(Math.random() * 100);
            result += 'M';
        }
        return result;
    }

    createRandomMangementFees() {
        let result = 'HKD ';
        for (let i = 1; i < 2; i++) {
            result += parseFloat(Math.random().toFixed(5));
            result += 'M / Year';
        }
        return result;
    }

}