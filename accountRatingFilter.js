import { LightningElement, wire } from 'lwc';
import getAccounts from '@salesforce/apex/AccountHelper.getAccounts';

export default class AccountRatingFilter extends LightningElement {

    rating = '';
    accounts;
    error;

    // Dropdown options (controlled input → no user mistakes)
    get options() {
        return [
            { label: 'Hot', value: 'Hot' },
            { label: 'Warm', value: 'Warm' },
            { label: 'Cold', value: 'Cold' }
        ];
    }

    handleRatingChange(event) {
        this.rating = event.detail.value;
    }

    @wire(getAccounts, { rating: '$rating' })
    wiredAccounts({ data, error }) {

        if (data) {
            this.accounts = data.map(acc => {
                let badgeClass = 'slds-badge';

                if (acc.Rating === 'Hot') {
                    badgeClass += ' slds-theme_error';
                } else if (acc.Rating === 'Warm') {
                    badgeClass += ' slds-theme_warning';
                } else if (acc.Rating === 'Cold') {
                    badgeClass += ' slds-theme_success';
                }

                return { ...acc, badgeClass };
            });

            this.error = undefined;

        } else if (error) {
            this.accounts = undefined;
            this.error = error;
        }
    }

    get showRating() {
        return this.rating === 'Hot' ||
               this.rating === 'Warm' ||
               this.rating === 'Cold';
    }
}
