class SQLDynamicWhere{

    static LogicalOperator = {
        And: 'AND',
        Or: 'OR'
    };
    
    static ComparisonOperator = {
        Equals: '=',
        DoesNotEqual: '!=',
        GreaterThan: '>',
        LessThan: '<',
        GreaterThanOrEqual: '>=',
        LessThanOrEqual: '<=',
    };

    /**
     * 
     * Initializes where clause storage
     * 
     */
    constructor(){
        this.whereClauses = [];
    }

    /**
     * 
     * The new where clause parameter
     * @param {LogicalOperator} logicalOperator
     * @param {string} field
     * @param {ComparisonOperator} comparisonOperator
     * @param {*} value
     * @param {Array} override
     * 
     */
    add(logicalOperator, field, comparisonOperator, value, override = null){

        if (value !== null && typeof value !== 'undefined'){ 

            this.whereClauses.push(
                {
                    logicalOperator: logicalOperator,
                    field: field,
                    comparisonOperator: comparisonOperator,
                    value: value,
                    override: override
                }
            );

        }

    }

    getWhereClauses(){

        // TODO FIX ISSUE WHERE I NEED TO ADD THE ACTUAL "WHERE" KEYWORD

        var whereClausesString = "";

        this.whereClauses.forEach(element => {
            whereClausesString += ` ${element.logicalOperator} ${element.field} ${element.comparisonOperator} (?)`;
        });

        return whereClausesString;

    }

    /**
     * 
     * Returns the where clauses
     * 
     */
    getValues(){

        var onlyValues = [];

        this.whereClauses.forEach(element => {
            onlyValues.push(element.value);
        });

        return onlyValues;
    }

}

module.exports = SQLDynamicWhere;