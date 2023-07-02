```
  ___                       _     __      ___                
 |   \ _  _ _ _  __ _ _ __ (_)__  \ \    / / |_  ___ _ _ ___ 
 | |) | || | ' \/ _` | '  \| / _|  \ \/\/ /| ' \/ -_) '_/ -_)
 |___/ \_, |_||_\__,_|_|_|_|_\__|   \_/\_/ |_||_\___|_| \___|
       |__/                                                            
```

Dynamically handle multiple WHERE clauses in your SQL statements.  
This package makes it easier to pass in query parameters from an endpoint into your SQL query string.  
If a value in any of the WHERE statements is undefined it will be skipped in the clauses string.

## Setup
Adding sql-dynamic-where to your project
```bash
npm i sql-dynamic-where
```
Adding sql-dynamic-where to a script
```js
const sdw = require('../SQLDynamicWhere');
dynamicWhere = new sdw();
```
## Examples
Generating WHERE clauses with multiple variables
```js
// Clear any previously stored values
dynamicWhere.clear();

// Add where clauses
dynamicWhere.add('name',  sdw.Comparison.Equals, 'Jacob');
dynamicWhere.add(sdw.Logic.And, 'age',  sdw.Comparison.LessThan, 50);
dynamicWhere.add(sdw.Logic.Or, 'eyes',  sdw.Comparison.DoesNotEqual, 'blue');

// Returns: WHERE name = 'Jacob' AND age < 50 OR eyes != 'blue'
dynamicWhere.getClauses() 
```

Generating WHERE clauses with multiple variables, some undefined
```js
// Clear any previously stored values
dynamicWhere.clear();

// Add where clauses
dynamicWhere.add('name',  sdw.Comparison.Equals, 'Jacob');
dynamicWhere.add(sdw.Logic.And, 'age',  sdw.Comparison.LessThan, undefined);
dynamicWhere.add(sdw.Logic.Or, 'eyes',  sdw.Comparison.DoesNotEqual, 'blue');

// Returns: WHERE name = 'Jacob' OR eyes != 'blue'
dynamicWhere.getClauses() 
```

Generating WHERE clauses with a placeholder string for the values
```js
// Clear any previously stored values
dynamicWhere.clear();

// Add where clauses
dynamicWhere.add('name',  sdw.Comparison.Equals, 'Jacob');
dynamicWhere.add(sdw.Logic.And, 'age',  sdw.Comparison.LessThan, 50);
dynamicWhere.add(sdw.Logic.Or, 'eyes',  sdw.Comparison.DoesNotEqual, 'blue');

// Returns ['Jacob', 50, 'blue']
dynamicWhere.getValues()

// Returns: WHERE name = (?) AND age < (?) OR eyes != (?)
dynamicWhere.getClausesWithValuePlaceholders()
```

Generating WHERE clauses snippet without the WHERE keyword
```js
// Clear any previously stored values
dynamicWhere.clear();

// Add where clauses
dynamicWhere.add(sdw.Logic.Or, 'name',  sdw.Comparison.Equals, 'Jacob');
dynamicWhere.add(sdw.Logic.And, 'age',  sdw.Comparison.LessThan, 50);

// Notice that true is being passed into this function
// Returns: OR name = (?) AND age < (?)
dynamicWhere.getClauses(true)
```


## Function Overrides




## License

[MIT](https://choosealicense.com/licenses/mit/)