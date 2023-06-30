class SQLDynamicWhere{

    /**
     * 
     * Enumerated type for logical operators
     * 
     */
    static Logic = {
        And: 'AND',
        Or: 'OR'
    };
    
    /**
     * 
     * Enumerated type for comparison operators
     * 
     */
    static Comparison = {
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
     * Adds a new dynamic where clause 
     *
     * @param {Logic} logicalOperator - The logical operator of the where clause
     * @param {string} field - The table field
     * @param {Comparison} comparisonOperator - The comparison operator of the where clause
     * @param {*} value - The value to compare against
     * @param {Array} override - (Optional) An array of additional value overrides to ignore
     * 
     */
    add(logicalOperator, field, comparisonOperator, value, override = []){

        // If there is no value or it is overrided then do not add it to the array
        if (value === null || typeof value === 'undefined' || override.includes(value)) return;

        // Otherwise store it in the override array
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

    /**
     * 
     * Returns an array of all the where clauses values. 
     * Values will be in the order they were added in.
     * 
     */
    getValues(){

        var onlyValues = [];

        this.whereClauses.forEach(element => {
            onlyValues.push(element.value);
        });

        return onlyValues;

    }

    /**
     * 
     * @param {string} baseQuery - The current portion of the SQL query. Usually containing the SELECT and FROM clauses
     * @returns A SQL query safe string that contains all the where clauses
     * 
     */
    getClauses(baseQuery){

        // TODO Add override for insert symbol?
        // TODO Add option to insert values over symbol?

        var clauses = "";

        // If no "WHERE" keyword present in the base query
        if (!baseQuery.toLowerCase().includes("where")){
            
            // Add WHERE keyword
            baseQuery += ' WHERE ';

            // Add clauses
            for (let i = 0; i < this.whereClauses.length; i++){

                // Skip logical operator on the first clause
                if (i === 0 ) clauses += ` ${this.whereClauses[i].field} ${this.whereClauses[i].comparisonOperator} (?)`;
                else clauses += ` ${this.whereClauses[i].logicalOperator} ${this.whereClauses[i].field} ${this.whereClauses[i].comparisonOperator} (?)`;
                
            }

        }
        // If "WHERE" keyword already present in the base query
        else {

            // Split base query into parts using WHERE keyword as the delimiter
            splitBaseQuery = baseQuery.toLowerCase().split('where')

            // If there are multiple WHERE keywords in the base query throw an error
            if (splitBaseQuery.length !== 2) throw new Error("Error crafting where clauses! Base query contains too many \'where\' keywords");

            // If there are no clauses present
            if (splitBaseQuery[1].trim().length === 0){
                
                // Add clauses
                for (let i = 0; i < this.whereClauses.length; i++){

                    // Skip logical operator on the first clause
                    if (i === 0 ) clauses += ` ${this.whereClauses[i].field} ${this.whereClauses[i].comparisonOperator} (?)`;
                    else clauses += ` ${this.whereClauses[i].logicalOperator} ${this.whereClauses[i].field} ${this.whereClauses[i].comparisonOperator} (?)`;
                    
                }

            }
            // If there are some clauses already present
            else {

                // Add clauses
                for (let i = 0; i < this.whereClauses.length; i++){

                    // Skip logical operator on the first clause
                    clauses += ` ${this.whereClauses[i].logicalOperator} ${this.whereClauses[i].field} ${this.whereClauses[i].comparisonOperator} (?)`;
                    
                }
                
            }

        }

        return clauses;

    }

}

module.exports = SQLDynamicWhere;