function getData() {
    // 網頁介面對應
    var input_salary        = document.getElementById('input-expect-salary');

    var input_ast_chinese   = document.getElementById('input-ast-chinese');
    var input_ast_english   = document.getElementById('input-ast-english');
    var input_ast_mathA     = document.getElementById('input-ast-math-a');
    var input_ast_mathB     = document.getElementById('input-ast-math-b');
    var input_ast_history   = document.getElementById('input-ast-history');
    var input_ast_geography = document.getElementById('input-ast-geography');
    var input_ast_citizen   = document.getElementById('input-ast-citizen-and-social');
    var input_ast_physics   = document.getElementById('input-ast-physics');
    var input_ast_chemistry = document.getElementById('input-ast-chemistry');
    var input_ast_biology  = document.getElementById('input-ast-biology');

    var input_gsat_chinese  = document.getElementById('input-gsat-chinese');
    var input_gsat_english  = document.getElementById('input-gsat-english');
    var input_gsat_mathA     = document.getElementById('input-gsat-math-a');
    var input_gsat_mathB     = document.getElementById('input-gsat-math-b');
    var input_gsat_social   = document.getElementById('input-gsat-social');
    var input_gsat_nature   = document.getElementById('input-gsat-nature');
    var input_gsat_engLis   = document.getElementById('input-gsat-english-listen');

    var input_departmentGroup = document.getElementsByName('input-department-group');
    var input_stateGroup = document.getElementsByName('input-state-group');
    var input_universityGroup = document.getElementsByName('input-university-group');

    // 取得使用者填寫的表單資料
        if(input_salary.value == "") {
        var salary = parseFloat(0);
        }
        else {
        var salary = parseFloat(input_salary.value);
        }
    var ast_chinese = parseInt(input_ast_chinese.value);
    var ast_english = parseInt(input_ast_english.value);
    var ast_mathA = parseInt(input_ast_mathA.value)
    var ast_mathB = parseInt(input_ast_mathB.value);
    var ast_history = parseInt(input_ast_history.value);
    var ast_geography = parseInt(input_ast_geography.value);
    var ast_citizen = parseInt(input_ast_citizen.value);
    var ast_physics = parseInt(input_ast_physics.value);
    var ast_chemistry = parseInt(input_ast_chemistry.value);
    var ast_biology = parseInt(input_ast_biology.value);

    if(input_gsat_chinese.value == "") { var gsat_chinese = parseInt(0); }
    else { var gsat_chinese = parseInt(input_gsat_chinese.value); }
    if(input_gsat_english.value == "") { var gsat_english = parseInt(0); }
    else { var gsat_english = parseInt(input_gsat_english.value); }
    if(input_gsat_mathA.value == "") { var gsat_mathA = parseInt(0); }
    else { var gsat_mathA = parseInt(input_gsat_mathA.value); }
    if(input_gsat_mathB.value == "") { var gsat_mathB = parseInt(0); }
    else { var gsat_mathB = parseInt(input_gsat_mathB.value); }
    if(input_gsat_social.value == "") { var gsat_social = parseInt(0); }
    else { var gsat_social = parseInt(input_gsat_social.value); }
    if(input_gsat_nature.value == "") { var gsat_nature = parseInt(0); }
    else { var gsat_nature = parseInt(input_gsat_nature.value); }
    var gsat_engLis = input_gsat_engLis.value;

    var departmentGroup = [];
    for(var i=0; i<input_departmentGroup.length; i++) {
        if(input_departmentGroup[i].checked) {
            departmentGroup.push(input_departmentGroup[i].value);
        }
        }
    // 若沒選擇的話，就全選
        if(departmentGroup.length == 0) {
        for(var i=0; i<input_departmentGroup.length; i++) {
            departmentGroup.push(input_departmentGroup[i].value);
        }
        }

    var stateGroup = [];
    for(var i=0; i<input_stateGroup.length; i++) {
        if(input_stateGroup[i].checked) {
        stateGroup.push(input_stateGroup[i].value);
        }
    }
    // 若沒選擇的話，就全選
    if(stateGroup.length == 0) {
        for(var i=0; i<input_stateGroup.length; i++) {
        stateGroup.push(input_stateGroup[i].value);
        }
    }

    var universityGroup = [];
    for(var i=0; i<input_universityGroup.length; i++) {
        if(input_universityGroup[i].checked) {
        universityGroup.push(input_universityGroup[i].value);
        }
    }
    // 若沒選擇的話，就全選
    if(universityGroup.length == 0) {
        for(var i=0; i<input_universityGroup.length; i++) {
        universityGroup.push(input_universityGroup[i].value);
        }
    }

    // 製作JSON
    let data = {
        grades: {
            ast: {
                Chinese: ast_chinese,
                English: ast_english,
                Math_A: ast_mathA,
                Math_B: ast_mathB,
                History: ast_history,
                Geographic:ast_geography,
                Citizen_and_Society: ast_citizen,
                Physics: ast_physics,
                Chemistry: ast_chemistry,
                Biology: ast_biology
            },
            gsat: {
                Chinese: gsat_chinese,
                English: gsat_english,
                Math_A: gsat_mathA,
                Math_B: gsat_mathB,
                Society: gsat_social,
                Science: gsat_nature,
                EngListeningLevel: gsat_engLis
            }
        },
        groups: departmentGroup,
        location: stateGroup,
        property: universityGroup,
        expect_salary: salary
    };

    return data;
}

function sentToLIFF(data) {
    if (!liff.isInClient()) {
        window.alert('This button is unavailable as LIFF is currently being opened in an external browser.');
    } else {
        liff.sendMessages([
            {
                type: 'text',
                text: `/predict/${JSON.stringify(data)}`,
            },
        ]).then(() => {
            liff.closeWindow();
        }).catch((error) => {
            window.alert('Error sending message: ' + error);
        });
    }
}

let form_input = document.getElementById('input-form');
form_input.onsubmit = (e) => {
    e.preventDefault();
    let studentGrade = getData();
    sentToLIFF(studentGrade);
}

liff.init({
    liffId: '1657008881-l0M8Bwa5'
});

