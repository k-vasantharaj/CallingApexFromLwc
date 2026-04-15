import { LightningElement, wire } from 'lwc';
import getAccounts from '@salesforce/apex/AccountHelper.getAccounts';

export default class AccountList extends LightningElement {

    rating = '';       // reactive parameter
    accounts;
    error;

    // Button Handlers
    isHotClicked() {
        this.rating = 'Hot';
    }

    isWarmClicked() {
        this.rating = 'Warm';
    }

    isColdClicked() {
        this.rating = 'Cold';
    }

    // Wire Apex with dynamic parameter
    @wire(getAccounts, { rating: '$rating' })
    wiredAccounts({ data, error }) {

        if (data) {

            // Add SLDS badge styling dynamically
            this.accounts = data.map(acc => {
                let badgeClass = 'slds-badge';

                if (acc.Rating === 'Hot') {
                    badgeClass += ' slds-theme_error';
                } 
                else if (acc.Rating === 'Warm') {
                    badgeClass += ' slds-theme_warning';
                } 
                else if (acc.Rating === 'Cold') {
                    badgeClass += ' slds-theme_success';
                }

                return {
                    ...acc,
                    badgeClass
                };
            });

            this.error = undefined;

        } else if (error) {
            this.accounts = undefined;
            this.error = error;
        }
    }
}
