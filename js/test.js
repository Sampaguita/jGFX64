"use strict";

QUnit.test( "hello test", function( assert ) {
    assert.ok( 1 == "1", "Passed!" );
});

QUnit.test( "read KLA file", function( assert ) {
    assert.ok( 1 == "0", "No path/file given." );
    assert.ok( 1 == "0", "File not found." );
    assert.ok( 1 == "0", "File not has wrong size." );
    assert.ok( 1 == "0", "File is not binary." );
    assert.ok( 1 == "0", "File data corruct." );
    assert.ok( 1 == "0", "File read sucessfully." );
});

