module.exports = function (pool) {

    async function addReg(RegNum, code) {
        let regCode = await pool.query('SELECT * FROM towns WHERE reg=$1', [code+=' ']);
       
        if (regCode.rows.length !== 0) {
            
            let regNumber = await pool.query('SELECT * FROM reg WHERE reg_numbers=$1', [RegNum])

            if (regNumber.rows.length === 0) {
                await insertIntoRegDB(RegNum, regCode.rows[0].id);
                return 'Found';
            }
            else {
                return 'Duplicate'
            }
        }
        else {
            return 'Non-exist'
        }
    }

    async function readTowns(code) {
        await pool.query('SELECT * FROM towns WHERE reg=$1', [code+=' '])
    }

    
    async function insertIntoRegDB(RegNum, regCode) {
      await pool.query('INSERT INTO reg (reg_numbers, town_id) VALUES ($1, $2)', [RegNum, regCode]);
    }

    async function selectTownCode(regis) {
        let outcome = await pool.query('SELECT id FROM towns WHERE reg=$1', [regis]);
        //  console.log(outcome.rows);
        return outcome.rows;

    }

    async function selectTownID(town_id) {
        let results = await pool.query('SELECT reg_numbers FROM reg WHERE town_id=$1', [town_id])
        
        return results.rows;
    }

    async function getReg(){
        let reg = await pool.query('SELECT reg_numbers FROM reg');
        return reg.rows;
    }

    async function readRegistration(reg) {
        let outcome = await pool.query('SELECT * FROM reg where reg_numbers=$1', [reg]);
        return outcome.rows;
    }

    async function ReadRegData() {
        let outcome = await pool.query('SELECT * FROM reg'); 
        // console.log(outcome.rows)
        return outcome.rows;
    }

    return {
        insertIntoRegDB,
        readRegistration,
        addReg,
        readTowns,
        getReg,
        ReadRegData,
        selectTownCode,
        selectTownID
    }
}

