declare module "sql-dynamic-where" {
    type Logic = {
        And: "AND";
        Or: "OR";
    };

    type Comparison = {
        Equals: "=";
        DoesNotEqual: "!=";
        GreaterThan: ">";
        LessThan: "<";
        GreaterThanOrEqual: ">=";
        LessThanOrEqual: "<=";
    };

    type ValueOf<T> = T[keyof T];

    interface Clause {
        logicalOperator: ValueOf<Logic>;
        field: string;
        comparisonOperator: ValueOf<Comparison>;
        override: any[];
    }

    export default class SWD {
        static Comparison: Comparison;
        static Logic: Logic;

        /**
         * Initializes where clause storage and values storage
         */
        constructor();

        /**
         * Adds a new dynamic where clause
         *
         * @param {Logic} logicalOperator - The logical operator of the where clause
         * @param {string} field - The table field
         * @param {Comparison} comparisonOperator - The comparison operator of the where clause
         * @param {*} value - The value to compare against
         * @param {Array} override - (Optional) An array of additional value overrides to ignore
         */
        add(
            logicalOperator: ValueOf<Logic>,
            field: string,
            comparisonOperator: ValueOf<Comparison>,
            value: any,
            override?: []
        ): void;

        /**
         * Adds a new dynamic where clause
         *
         * @param {string} field - The table field
         * @param {Comparison} comparisonOperator - The comparison operator of the where clause
         * @param {*} value - The value to compare against
         * @param {Array} override - (Optional) An array of additional value overrides to ignore
         */
        addFirst(
            field: string,
            comparisonOperator: ValueOf<Comparison>,
            value: any,
            override?: []
        ): void;

        /**
         * Clears all stored where clause storage
         */
        clear(): void;

        /**
         * @param {boolean} leadingLogicalOperator - (Optional) Choose whether the string contains the WHERE clause and if the first clause needs a logical operator
         * @returns A SQL query safe string that contains all the where clauses
         */
        getClauses(leadingLogicalOperator?: boolean): string;

        /**
         * Returns the array that stores all the where clause data. Mostly used for testing
         */
        getClausesArray(): Clause[];

        /**
         * @param {boolean} leadingLogicalOperator - (Optional) Choose whether the string contains the WHERE clause and if the first clause needs a logical operator
         * @param {string} placeholderString - (Optional) Choose which string to use as a placeholder for values
         * @returns A SQL query safe string that contains all the where clauses
         */
        getClausesWithValuePlaceholders(
            leadingLogicalOperator?: boolean,
            placeholderString?: string
        ): string;

        /**
         * Returns an array of all the where clauses values.
         * Values will be in the order they were added in.
         */
        getValues(): any[];
    }
}
