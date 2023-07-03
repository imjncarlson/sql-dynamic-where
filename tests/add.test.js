const sdw = require('../SQLDynamicWhere');

dynamicWhere = new sdw();

test('Adding a new clause with real value', () => {  
    
    dynamicWhere.clear();
    dynamicWhere.add(sdw.Logic.And, 'name',  sdw.Comparison.Equals, 'Jacob');

    expect(dynamicWhere.getClausesArray().length).toBe(1);
    expect(dynamicWhere.getValues().length).toBe(1);

});

test('Adding a new clause with empty values', () => {  

    dynamicWhere.clear();
    dynamicWhere.add(sdw.Logic.And, 'name',  sdw.Comparison.Equals, undefined);
    dynamicWhere.add(sdw.Logic.Or, 'age',  sdw.Comparison.LessThan, null);

    expect(dynamicWhere.getClausesArray().length).toBe(0);
    expect(dynamicWhere.getValues().length).toBe(0);

});

test('Adding a new clause with override values', () => {  
    
    dynamicWhere.clear();
    dynamicWhere.add(sdw.Logic.And, 'name',  sdw.Comparison.Equals, 'Jacob', ['Jacob']);
    dynamicWhere.add(sdw.Logic.Or, 'name',  sdw.Comparison.DoesNotEqual, 'Kevan');
    
    expect(dynamicWhere.getClausesArray().length).toBe(1);
    expect(dynamicWhere.getValues().length).toBe(1);

});

test('Adding a new clause with no leading logic operator', () => {  
    
    dynamicWhere.clear();
    dynamicWhere.addFirst('color',  sdw.Comparison.Equals, 'green');

    expect(dynamicWhere.getClausesArray().length).toBe(1);
    expect(dynamicWhere.getValues().length).toBe(1);

});