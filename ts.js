
function display_content(a) {
    document.getElementsByClassName("calc-display")[0].innerHTML = a;
}

function numeric_content(a) {
    
    if (a == "." && String(_a).includes(".")) {
        return
    } else if (_a == "" && a == ".") {
        _a = "0";
    }
    document.getElementsByClassName("calc-display")[0].innerHTML = _a + a;
    _a += a;
    num_app = 1;
}

function operator(a) {

    if (a == "←") {
        if (!_a == 0 && _a.length >= 2) {
            _a = _a.substring(0, _a.length - 1);
            display_content(_a);
        } else {
            _a = "";
            display_content(0);
        }
        return
    }

    if (a == "DEL") {
        _a = "";
        _b = "";
        history = "";
        past_op = "x"; 
        eq_active = 0;
        enable_pemdas = 0;

        print_history(history);
        document.getElementsByClassName("text-area")[0].innerHTML = history;
        display_content(0);
        return
    }

    
    op_check = history.slice(-2, -1);
    if ((op_check == "+" || op_check == "-" || op_check == "x" || op_check == "÷") && isNaN(history.slice(-2)) && _a == "" && num_app == 0 && a != "=") {
        history = history.slice(0, -2) + a + " ";
        print_history(history);
        num_app = 0;
        past_op = a;
        eq_active = 0;
        if (pemdas_trigger == 0 && past_op == "x") {
            pemdas_bi = bi;
            pemdas_ai = ai;
            pemdas_value = op_check;
            pemdas_trigger = 1;
        } else {
            pemdas_trigger = 0;
        }
        return
    }  else if ( past_op == "=" && a != "=") {
        if ((a == "x" || a == "÷") && _a == "") {
            _a = "1";
        }
        past_op = a;
        sum_op = 1;
    } else if (past_op == "=") {
        return
    }
    
    if (eq_active == 1 && a != "=") {
        bak_past_op = past_op
        past_op = a;
    }
    
    if (a == "+") {
        _b = calc_add(_a, _b, past_op, a);
        calculator_history(_a, _b, a);
        past_op = "+";
        _a = "";
        display_content(_b);
    }

    if (a == "-") {
        _b = calc_add(_a, _b, past_op, a);
        calculator_history(_a, _b, a);
        past_op = "-";
        _a = "";
        display_content(_b);
    }

    if (a == "x") {
        if ((enable_pemdas == 1 && past_op != "x") || (enable_pemdas == 1 && eq_active == 1 && bak_past_op != "x")) {
            if (eq_active == 1) {
                if(bak_past_op == "+" || bak_past_op == "-") {
                    pemdas_value = bak_past_op
                    pemdas_memory = new BigNumber(past__b);
                    pemdas_bi = new BigNumber(past__a);
                }
            } else {
                if(past_op == "+" || past_op == "-") {
                    pemdas_value = past_op; 
                    pemdas_memory = new BigNumber(_b); 
                    pemdas_bi = new BigNumber(_a); 
                }
            }
            
        }
        _b = calc_add(_a, _b, past_op, a);
        calculator_history(_a, _b, a);
        _a = "";
        display_content(_b);
        past_op = "x";
    }

    if (a == "÷") {
        
        if ((enable_pemdas == 1 && past_op != "÷") || (enable_pemdas == 1 && eq_active == 1 && bak_past_op != "÷")) {
            if (eq_active == 1) {
                if(bak_past_op == "+" || bak_past_op == "-") {
                    pemdas_value = bak_past_op
                    pemdas_memory = new BigNumber(past__b);
                    pemdas_bi = new BigNumber(past__a);
                }
            } else {
                if(past_op == "+" || past_op == "-") {
                    pemdas_value = past_op; 
                    pemdas_memory = new BigNumber(_b); 
                    pemdas_bi = new BigNumber(_a); 
                }
            }
            
        }
        if (_b == "") {
            _b = "1";
            _b = calc_add(_b, _a, past_op, a);
        } else {
            _b = calc_add(_a, _b, past_op, a);

        }
        calculator_history(_a, _b, a);
        _a = "";
        display_content(_b);
        past_op = "÷"; 
    }

    if (a == "=") {
        if (eq_active == 0) {
            _b = calc_add(_a, _b, past_op);
        }
        calculator_history(_a, _b, a);
        display_content(_b);
        past_op = "=";
        eq_active = 1;
        _a = "";
        num_app = 1;
        enable_pemdas = 0;
    }

    num_app = 0;
    if ((a == "+" || a == "-") && enable_pemdas == 0) {
        enable_pemdas = 1;
        pemdas_value = a;
    }

}

function calculator_history(_a, _b, a) {
    if (sum_op == 1) {
        if (_a == "" || a == "x" || a == "÷") {
            if (num_app == 1) {
                history += a + " " + _a + " ";
                _a = "1";
            } else {
                history += a + " ";
                _a = "1";
                eq_active = 0;
            }
        } else if(history == "") {
            history += _a + " " + a + " ";
            
        } else {
            history += a + " " + _a + " ";
            eq_active = 1;
        }
        
        sum_op = 0;
        print_history(history); 
        return
    } 

    if (old_a) {
        history += _a + " ";
        old_a = "";
    } else if (a == "=") {
        if (isNaN(history.slice(-2, -1)) && num_app == 0) {
            history = history.slice(0, -2) + " " + a + " " + _b + " ";
        } else if (isNaN(history.slice(-2, -1)) && num_app == 1) {
            history += _a + " " + a + " " + _b + " ";
        } else if (!isNaN(history.slice(-2, -1)) && eq_active == 1) {
            if (_a == "") {
                history += a + " " + _b + " ";
            } else {
                if (past_op == "÷" || past_op == "x") {
                    history += a + " " + _b + " ";
                } else {
                    history += past_op + " " + _a + " " + a + " " + _b + " ";
                }
            }
        } else {
            history += past_op + " " + _a + " " + a + " " + _b + " ";
        }
    } else if (eq_active == 1) {
        if (_a == "") {
            eq_active = 0;
            history += a + " ";  
        } else {
            history += a + " " + _a + " ";
        }
    } else {
        history += _a + " " + a + " ";
        eq_active = 0;
    }
    print_history(history);
}

function print_history(history) {
    document.getElementsByClassName("text-area")[0].innerHTML = history;
}

function calc_add(_a, _b, value, pemdas) {
    _b = parseFloat(_b);
    _a = parseFloat(_a);
    
    if (eq_active == 1) {
        past__a = _a;
        past__b = _b;
    }

    if (isNaN(_b)) { 
        if (value == "+" || value == "-") {
            ai = new BigNumber(0);
        } else if (value == "x" || value == "÷") {
            ai = new BigNumber(1);
        }
    } else {
        ai = new BigNumber(_b);
    }

    if (isNaN(_a)) {
        if (value == "+" || value == "-") {
            bi = new BigNumber(0);
        } else if (value == "x" || value == "÷") {
            bi = new BigNumber(1);
        }
    } else {
        bi = new BigNumber(_a);
    }

    if (value == "x") {
        if (enable_pemdas == 1) {
            pemdas_bi = pemdas_bi.multipliedBy(bi);
            bi = pemdas_bi;
            ai = pemdas_memory;
            value = pemdas_value;
        } else {
            return ai.multipliedBy(bi)
        }
    }

    if (value == "÷") {
        if (enable_pemdas == 1) {
            pemdas_bi = pemdas_bi.dividedBy(bi);
            bi = pemdas_bi;
            ai = pemdas_memory;
            value = pemdas_value;
        } else {
            return ai.dividedBy(bi)
        }
    }

    if (value == "+") {
        return ai.plus(bi)
    }
    if (value == "-") {
        return ai.minus(bi)
    }

}

function calc_history(rslt, para, sum) {
    let pcalc_history = history.replace(/<[^>]*>?/gm, '').replace(/\s/g, '');
    if(isNaN(pcalc_history.slice(-1)) && history.length != 0) {
        if (para == "=") { 
            if (rslt == 0 ) {
                history = history.slice(0, -2) + " " + para + " ";
            } else {
                history = history.slice(0, -2) + " " + past_op + " " + rslt + " " + para + " ";
            }
        } else {
            if (past_op != para ) {
                history.slice(0, -2) + " " + para + " " + rslt + " "; 
            } else if (rslt != 0) {
                history = history.slice(0, -2) + " " + para + " " + rslt + " "; 
            }
        }
    } else {
        if (para == "=") {
            if (past_op != "=") {
                if (rslt == 0) {
                    history = history + " " + para + " ";  
                } else {
                    history = history + " " + past_op + " " + rslt + " " + para + " "; 
                }
            }
        } else if (history.length == 0) {
            history = rslt + " " + para + " ";
        } else if (rslt == "0") {
            return
        } else {
            history = history + " " + para + " " + rslt + " ";
        }
    }
    
    if (sum) {
        sum = "<a class=\"green_sum\">" + sum + "</a>";
        history = history + sum + " ";
    }
    document.getElementsByClassName("text-area")[0].innerHTML = history;
}

const buttons = document.querySelectorAll(".button");
buttons.forEach(button => {
    button.addEventListener("click", function() {
        if (button.classList.contains("numbers") || button.classList.contains("point")) {
            
            numeric_content(button.textContent);
        } else if (button.classList.contains("operator")) {
            operator(button.textContent);
        }
    });
});

