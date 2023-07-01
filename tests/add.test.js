const sdw = require('../SQLDynamicWhere');

test('Adding a new clause with real value', () => {  
    dynamicWhere = new sdw();
    dynamicWhere.add(sdw.Logic.And, 'name',  sdw.Comparison.Equals, 'Jacob');
    expect(dynamicWhere.getClausesArray().length).toBe(1);
});

test('Adding a new clause with empty values', () => {  
    dynamicWhere = new sdw();
    dynamicWhere.add(sdw.Logic.And, 'name',  sdw.Comparison.Equals, undefined);
    dynamicWhere.add(sdw.Logic.Or, 'age',  sdw.Comparison.LessThan, null);
    expect(dynamicWhere.getClausesArray().length).toBe(0);
});

test('Adding a new clause with override values', () => {  
    dynamicWhere = new sdw();
    dynamicWhere.add(sdw.Logic.And, 'name',  sdw.Comparison.Equals, 'Jacob', ['Jacob']);
    dynamicWhere.add(sdw.Logic.Or, 'name',  sdw.Comparison.DoesNotEqual, 'Kevan');
    expect(dynamicWhere.getClausesArray().length).toBe(1);
});
