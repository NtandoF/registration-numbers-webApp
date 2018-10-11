const assert = require('assert');
const RegistrationConstructor = require('../services/registrations');
const pg = require("pg");
const Pool = pg.Pool;

const connectionString = process.env.DATABASE_URL || 'postgresql://coder:1234@localhost:5432/registration';


const pool = new Pool({
    connectionString
});

describe('Registration Numbers', async function(){

    beforeEach(async function(){
        await pool.query("delete from reg");
    });

    it('should return true if registration matches Cape Town', async function(){
      let callReg = RegistrationConstructor(pool);
    
       await callReg.addReg('CA 5561 ', 'CA');


      assert.deepEqual([ { reg_numbers: 'CA 5561 ' } ], await callReg.getReg());

    });

it('should return true if registration matches GEORGE', async function(){
      let callReg = RegistrationConstructor(pool);
      

      await callReg.addReg('CAW 8561 ', 'CAW');


      assert.deepEqual(await callReg.getReg(), [ { reg_numbers: 'CAW 8561 ' } ]);
    });

    it('should return true if registration matches BELVILLE', async function(){
      let callReg = RegistrationConstructor(pool);

      await callReg.addReg('CY 3699 ', 'CY');


      assert.deepEqual(await callReg.getReg('CY 3699'), [ { reg_numbers: 'CY 3699 ' } ])
   });
    it('should return true if registration matches Paarl', async function(){
      let callReg = RegistrationConstructor(pool);

      await callReg.addReg('CY 3699 ', 'CY');

      assert.deepEqual(await callReg.getReg('CJ 8457'), [ { reg_numbers: 'CY 3699 ' } ]);
    });
  
});  
