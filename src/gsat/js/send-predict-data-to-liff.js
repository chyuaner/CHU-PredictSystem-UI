function getData() {
    // 網頁介面對應
    var input_salary = document.getElementById('input-expect-salary');

    var input_gsat_chinese = document.getElementById('input-gsat-chinese');
    var input_gsat_english = document.getElementById('input-gsat-english');
    var input_gsat_math_A = document.getElementById('input-gsat-math-A');
    var input_gsat_math_B = document.getElementById('input-gsat-math-B');
    var input_gsat_social = document.getElementById('input-gsat-social');
    var input_gsat_nature = document.getElementById('input-gsat-nature');
    var input_gsat_engLis = document.getElementById('input-gsat-english-listen');

    var input_departmentGroup = document.getElementsByName('input-department-group');
    var input_stateGroup = document.getElementsByName('input-state-group');
    var input_universityGroup = document.getElementsByName('input-university-group');

    // 取得使用者填寫的表單資料
    if (input_salary.value == "") {
        var salary = parseFloat(0);
    } else {
        var salary = parseFloat(input_salary.value);
    }

    if (input_gsat_chinese.value == "") {
        var gsat_chinese = parseInt(0);
    } else {
        var gsat_chinese = parseInt(input_gsat_chinese.value);
    }
    if (input_gsat_english.value == "") {
        var gsat_english = parseInt(0);
    } else {
        var gsat_english = parseInt(input_gsat_english.value);
    }
    if (input_gsat_math_A.value == "") {
        var gsat_math_A = parseInt(0);
    } else {
        var gsat_math_A = parseInt(input_gsat_math_A.value);
    }

    if (input_gsat_math_B.value == "") {
        var gsat_math_B = parseInt(0);
    } else {
        var gsat_math_B = parseInt(input_gsat_math_B.value);
    }

    if (input_gsat_social.value == "") {
        var gsat_social = parseInt(0);
    } else {
        var gsat_social = parseInt(input_gsat_social.value);
    }
    if (input_gsat_nature.value == "") {
        var gsat_nature = parseInt(0);
    } else {
        var gsat_nature = parseInt(input_gsat_nature.value);
    }
    var gsat_engLis = input_gsat_engLis.value;

    var departmentGroup = [];
    for (var i = 0; i < input_departmentGroup.length; i++) {
        if (input_departmentGroup[i].checked) {
            departmentGroup.push(input_departmentGroup[i].value);
        }
    }
    // 若沒選擇的話，就全選
    if (departmentGroup.length == 0) {
        for (var i = 0; i < input_departmentGroup.length; i++) {
            departmentGroup.push(input_departmentGroup[i].value);
        }
    }

    var stateGroup = [];
    for (var i = 0; i < input_stateGroup.length; i++) {
        if (input_stateGroup[i].checked) {
            stateGroup.push(input_stateGroup[i].value);
        }
    }
    // 若沒選擇的話，就全選
    if (stateGroup.length == 0) {
        for (var i = 0; i < input_stateGroup.length; i++) {
            stateGroup.push(input_stateGroup[i].value);
        }
    }

    var universityGroup = [];
    for (var i = 0; i < input_universityGroup.length; i++) {
        if (input_universityGroup[i].checked) {
            universityGroup.push(input_universityGroup[i].value);
        }
    }
    // 若沒選擇的話，就全選
    if (universityGroup.length == 0) {
        for (var i = 0; i < input_universityGroup.length; i++) {
            universityGroup.push(input_universityGroup[i].value);
        }
    }

    var data = {
        grades: {
            gsat: {
                Chinese: gsat_chinese,
                English: gsat_english,
                MathA: gsat_math_A,
                MathB: gsat_math_B,
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
        alert('This button is unavailable as LIFF is currently being opened in an external browser.');
    } else {
        liff.sendMessages([
            {
                type: 'text',
                text: JSON.stringify(data),
            },
        ]).then(() => {
            liff.closeWindow();
        }).catch((error) => {
            window.alert('Error sending message: ' + error);
        });
    }
}

liff.init({
    liffId: '1657321772-40ezKwvL'
}).catch((err)=>{
    alert(err);
});

let form_input = document.getElementById('input-form');
form_input.onsubmit = function (e)  {
    e.preventDefault();
    let studentGrade = getData();
    sentToLIFF(studentGrade);
}
