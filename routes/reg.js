module.exports = function (registrations) {

        async function home(req, res) {
                let reg = await registrations.ReadRegData();
                res.render('home', { reg })
        }

        async function RegAddition(req, res) {
                try {
                        let reg = req.body.textInput;
                        // console.log(reg)
                        let RegNum = reg.toUpperCase();
                        // console.log(RegNum)
                        let code = RegNum.substring(0, 3).trim();
                        

                        if (RegNum === '') {
                                req.flash('info', 'Please Insert a Registration Number:')
                        }

                        else {
                                let regAddition = await registrations.addReg(RegNum, code);

                                if (regAddition === 'Found') {
                                        req.flash('success', 'Successfully Added!')
                                }
                                if (regAddition === 'Duplicate') {
                                        req.flash('info', 'Registration Already Exists')
                                }
                                if (regAddition === 'Non-exist') {
                                        req.flash('info', 'Invalid Registration')
                                }
                        }

                        res.redirect('/')
                }
                catch (err) {
                
                }
        }

        async function regNumbers(req, res) {
                try {
                        let townsFilter = req.body.townRadio;

                        if (townsFilter === 'All ') {
                                res.redirect('/')
                        }

                        if (townsFilter === 'CA ') {
                                let code = await registrations.selectTownCode(townsFilter);
                                result = code[0].id;
                                let reg = await registrations.selectTownID(result);
                                res.render('home', { reg });
                        }
                        if (townsFilter === 'CAW ') {
                                let code = await registrations.selectTownCode(townsFilter);
                                result = code[0].id;
                                let reg = await registrations.selectTownID(result);
                                res.render('home', { reg });
                        }
                        if (townsFilter === 'CJ ') {
                                let code = await registrations.selectTownCode(townsFilter);
                                result = code[0].id;
                                let reg = await registrations.selectTownID(result);
                                res.render('home', { reg });
                        }
                        if (townsFilter === 'CY ') {
                                let code = await registrations.selectTownCode(townsFilter);
                                result = code[0].id;
                                let reg = await registrations.selectTownID(result);
                                res.render('home', { reg });
                        }
                }
                catch (err) {
                        res.send(err.stack)
                }
        }

        return {
                home,
                RegAddition,
                regNumbers
        }
}