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
     * Initializes where clause storage and values storage
     * 
     */
    constructor(){
        this.whereClauses = [];
        this.values = [];
    }

    /**
     *
     * Adds a new dynamic where clause 
     *
     * @param {string} field - The table field
     * @param {Comparison} comparisonOperator - The comparison operator of the where clause
     * @param {*} value - The value to compare against
     * @param {Array} override - (Optional) An array of additional value overrides to ignore
     * 
     */
    addFirst(field, comparisonOperator, value, override = []){ this.add('AND', field, comparisonOperator, value, override) }

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

        // Store where clause
        this.whereClauses.push(
            {
                logicalOperator: logicalOperator,
                field: field,
                comparisonOperator: comparisonOperator,
                override: override
            }
        );
        
        // Store values
        this.values.push(value);

    }

    /**
     * 
     * Returns the array that stores all the where clause data. Mostly used for testing
     * 
     */
    getClausesArray(){ return this.whereClauses; }

    /**
     * 
     * Returns an array of all the where clauses values. 
     * Values will be in the order they were added in.
     * 
     */
    getValues(){ return this.values }

    /**
     * 
     * @param {boolean} leadingLogicalOperator - (Optional) Choose whether the string contains the WHERE clause and if the first clause needs a logical operator
     * @returns A SQL query safe string that contains all the where clauses
     * 
     */
    getClauses(leadingLogicalOperator = false){

        var clauses = "";

        // Add WHERE keyword
        if (!leadingLogicalOperator) clauses += ' WHERE';

        // Add clauses
        for (let i = 0; i < this.whereClauses.length; i++){

            // Skip logical operator on the first clause
            if (i === 0 && !leadingLogicalOperator) clauses += ` ${this.whereClauses[i].field} ${this.whereClauses[i].comparisonOperator}`;
            else clauses += ` ${this.whereClauses[i].logicalOperator} ${this.whereClauses[i].field} ${this.whereClauses[i].comparisonOperator}`;

            // If the value is a string put it in quotations
            if (typeof this.values[i] === 'string') clauses += ` \'${this.values[i]}\'`;
            else clauses += ` ${this.values[i]}`
            
        }

        return clauses;

    }

    /**
     * 
     * @param {boolean} leadingLogicalOperator - (Optional) Choose whether the string contains the WHERE clause and if the first clause needs a logical operator
     * @param {string} placeholderString - (Optional) Choose which string to use as a placeholder for values
     * @returns A SQL query safe string that contains all the where clauses
     * 
     */
    getClausesWithValuePlaceholders(leadingLogicalOperator = false, placeholderString = '(?)'){

        // TODO Add override for insert symbol?
        // TODO Add option to insert values over symbol?
        // TODO throw an error here if base query is undefined
        
        var clauses = "";

        // Add WHERE keyword
        if (!leadingLogicalOperator) clauses += ' WHERE';

        // Add clauses
        for (let i = 0; i < this.whereClauses.length; i++){

            // Skip logical operator on the first clause
            if (i === 0 && !leadingLogicalOperator) clauses += ` ${this.whereClauses[i].field} ${this.whereClauses[i].comparisonOperator} ${placeholderString}`;
            else clauses += ` ${this.whereClauses[i].logicalOperator} ${this.whereClauses[i].field} ${this.whereClauses[i].comparisonOperator} ${placeholderString}`;
            
        }

        return clauses;

    }

    /**
     * Clears all stored where clause storage
     */
    clear(){
        this.whereClauses = [];
        this.values = [];
    }

}

module.exports = SQLDynamicWhere;