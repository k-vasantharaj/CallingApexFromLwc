import { LightningElement } from 'lwc';
import getAccounts from '@salesforce/apex/AccountHelper.getAccounts';

export default class AccountRatingFilter extends LightningElement {

    rating = '';
    accounts = [];
    error;
    isLoading = false;

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

    handleOnClick() {

        if (!this.rating) {
            this.accounts = [];
            return;
        }

        this.isLoading = true;

        getAccounts({ rating: this.rating })
            .then(result => {
                this.accounts = result.map(acc => {
                    let badgeClass = 'slds-badge';

                    if (acc.Rating === 'Hot') {
                        badgeClass += ' slds-theme_error';
                    } else if (acc.Rating === 'Warm') {
                        badgeClass += ' slds-theme_warning';
                    } else {
                        badgeClass += ' slds-theme_success';
                    }

                    return { ...acc, badgeClass };
                });

                this.error = undefined;
            })
            .catch(error => {
                this.error = error;
                this.accounts = [];
            })
            .finally(() => {
                this.isLoading = false;
            });
    }

    get showRating() {
        return !!this.rating;
    }

    get hasAccounts() {
        return this.accounts.length > 0;
    }
}
