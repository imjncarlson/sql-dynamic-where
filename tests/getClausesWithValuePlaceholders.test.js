const sdw = require('../SQLDynamicWhere');

dynamicWhere = new sdw();

test('Creating WHERE clause', () => {  
    
    dynamicWhere.clear();
    dynamicWhere.add(sdw.Logic.And, 'name',  sdw.Comparison.Equals, 'Jacob');

    expect(dynamicWhere.getClausesWithValuePlaceholders()).toBe(' WHERE name = (?)');
    expect(dynamicWhere.getValues()[0]).toBe('Jacob')

});

test('Creating WHERE clause with leading operator', () => {  
    
    dynamicWhere.clear();
    dynamicWhere.add(sdw.Logic.And, 'color',  sdw.Comparison.Equals, 'red');

    expect(dynamicWhere.getClausesWithValuePlaceholders(true)).toBe(' AND color = (?)');
    expect(dynamicWhere.getValues()[0]).toBe('red')

});

test('Creating WHERE clause with multiple values', () => {  
    
    dynamicWhere.clear();
    dynamicWhere.add(sdw.Logic.And, 'name',  sdw.Comparison.Equals, 'Kevan');
    dynamicWhere.add(sdw.Logic.And, 'age',  sdw.Comparison.GreaterThanOrEqual, 50);
    dynamicWhere.add(sdw.Logic.Or, 'height',  sdw.Comparison.Equals, '4ft');

    expect(dynamicWhere.getClausesWithValuePlaceholders()).toBe(' WHERE name = (?) AND age >= (?) OR height = (?)');
    expect(dynamicWhere.getValues()[0]).toBe('Kevan')
    expect(dynamicWhere.getValues()[1]).toBe(50)
    expect(dynamicWhere.getValues()[2]).toBe('4ft')

});

test('Creating WHERE clause with multiple values, some undefined', () => {  
    
    dynamicWhere.clear();
    dynamicWhere.add(sdw.Logic.And, 'name',  sdw.Comparison.Equals, 'Parker');
    dynamicWhere.add(sdw.Logic.And, 'age',  sdw.Comparison.GreaterThanOrEqual, undefined);
    dynamicWhere.add(sdw.Logic.Or, 'height',  sdw.Comparison.Equals, '6ft');

    expect(dynamicWhere.getClausesWithValuePlaceholders()).toBe(' WHERE name = (?) OR height = (?)');
    expect(dynamicWhere.getValues()[0]).toBe('Parker')
    expect(dynamicWhere.getValues()[1]).toBe('6ft')

});

test('Creating WHERE clause with multiple values, some overrides', () => {  
    
    dynamicWhere.clear();
    dynamicWhere.add(sdw.Logic.And, 'make',  sdw.Comparison.Equals, 'Honda');
    dynamicWhere.add(sdw.Logic.And, 'model',  sdw.Comparison.GreaterThanOrEqual, 'HRV', ['HRV']);
    dynamicWhere.add(sdw.Logic.Or, 'year',  sdw.Comparison.Equals, 2022);

    expect(dynamicWhere.getClausesWithValuePlaceholders()).toBe(' WHERE make = (?) OR year = (?)');
    expect(dynamicWhere.getValues()[0]).toBe('Honda')
    expect(dynamicWhere.getValues()[1]).toBe(2022)

});

test('Creating WHERE clause with multiple values, custom placeholder', () => {  
    
    dynamicWhere.clear();
    dynamicWhere.add(sdw.Logic.And, 'make',  sdw.Comparison.Equals, 'Honda');
    dynamicWhere.add(sdw.Logic.And, 'model',  sdw.Comparison.DoesNotEqual, 'HRV');
    dynamicWhere.add(sdw.Logic.Or, 'year',  sdw.Comparison.Equals, 2022);

    expect(dynamicWhere.getClausesWithValuePlaceholders(false, '%%PLACEHOLDER%%')).toBe(' WHERE make = %%PLACEHOLDER%% AND model != %%PLACEHOLDER%% OR year = %%PLACEHOLDER%%');
    expect(dynamicWhere.getValues()[0]).toBe('Honda')
    expect(dynamicWhere.getValues()[1]).toBe('HRV')
    expect(dynamicWhere.getValues()[2]).toBe(2022)

});