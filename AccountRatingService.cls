public class AccountHelper {

    @AuraEnabled(Cacheable=true)
    public static List<Account> getAccounts(string rating) {
        return [SELECT Id,Name,Rating 
        FROM Account 
        WHERE Rating =: rating
        AND Rating != Null
        LIMIT 20 ];
    }

}
