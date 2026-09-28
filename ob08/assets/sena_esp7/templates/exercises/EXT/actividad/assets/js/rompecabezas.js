//INICIO VARIABLES GENERALES
var descripcion = "Answer the question. Drag and drop every puzzle piece and complete the image.";
var control_de_tiempo = "999";
var numero_de_preguntas = 9;
var numero_de_intentos = 2;
var puntaje = "1";
var puntaje_actual = "0";
var exito_puntaje = "9";
var preguntas_txt = '{"preguntas":[{"id_pregunta":"1","pregunta":"Is Code Access Security one of the best ways to improve the security in your computer?","respuestas":[{"tipo":"texto","respuesta":"No, it isn’t.","es_correcta":"no","seleccionada":"no"},{"tipo":"texto","respuesta":"No, it can’t.","es_correcta":"no","seleccionada":"no"},{"tipo":"texto","respuesta":"Yes, it is.","es_correcta":"si","seleccionada":"no"},{"tipo":"texto","respuesta":"Yes, it can.","es_correcta":"no","seleccionada":"no"}],"justificacion":"","pista":"Identify the tense in the question.","correcta":"no","seleccionada":"no"},{"id_pregunta":"2","pregunta":"How can you differentiate the permissions or rights a code has?","respuestas":[{"tipo":"texto","respuesta":"With infrastructure","es_correcta":"no","seleccionada":"no"},{"tipo":"texto","respuesta":"With Code Access Security","es_correcta":"si","seleccionada":"no"},{"tipo":"texto","respuesta":"With an application","es_correcta":"no","seleccionada":"no"},{"tipo":"texto","respuesta":"With a computer","es_correcta":"no","seleccionada":"no"}],"justificacion":"","pista":"","correcta":"no","seleccionada":"no"},{"id_pregunta":"3","pregunta":"Does a code have access to resources?","respuestas":[{"tipo":"texto","respuesta":"Yes, it has access to resources.","es_correcta":"si","seleccionada":"no"},{"tipo":"texto","respuesta":"Yes, it had resources.","es_correcta":"no","seleccionada":"no"},{"tipo":"texto","respuesta":"Yes, it was resources.","es_correcta":"no","seleccionada":"no"},{"tipo":"texto","respuesta":"Yes, it have access to other networks.","es_correcta":"no","seleccionada":"no"}],"justificacion":"","pista":"Identify the tense in the question.","correcta":"no","seleccionada":"no"},{"id_pregunta":"4","pregunta":"What does Code Access Security protect computers from?","respuestas":[{"tipo":"texto","respuesta":"It protects computers from bugs.","es_correcta":"no","seleccionada":"no"},{"tipo":"texto","respuesta":"It protects computers from windows.","es_correcta":"no","seleccionada":"no"},{"tipo":"texto","respuesta":"It protects computers from malicious code.","es_correcta":"si","seleccionada":"no"},{"tipo":"texto","respuesta":"It protects computers from malicious people.","es_correcta":"no","seleccionada":"no"}],"justificacion":"","pista":"","correcta":"no","seleccionada":"no"},{"id_pregunta":"5","pregunta":"Does Code Access Security protect trusted code?","respuestas":[{"tipo":"texto","respuesta":"No, it doesn’t.","es_correcta":"si","seleccionada":"no"},{"tipo":"texto","respuesta":"Yes, it does.","es_correcta":"no","seleccionada":"no"},{"tipo":"texto","respuesta":"No, it protects people.","es_correcta":"no","seleccionada":"no"},{"tipo":"texto","respuesta":"Yes, it protects people.","es_correcta":"no","seleccionada":"no"}],"justificacion":"","pista":"","correcta":"no","seleccionada":"no"},{"id_pregunta":"6","pregunta":"How can Code Access Security help with application management?","respuestas":[{"tipo":"texto","respuesta":" It gives you more control over the applications you want to perform.","es_correcta":"si","seleccionada":"no"},{"tipo":"texto","respuesta":"It doesn’t help with applications.","es_correcta":"no","seleccionada":"no"},{"tipo":"texto","respuesta":"It helps make applications.","es_correcta":"no","seleccionada":"no"},{"tipo":"texto","respuesta":"It helps code applications.","es_correcta":"no","seleccionada":"no"}],"justificacion":"","pista":"One of the functions of Code Access Security","correcta":"no","seleccionada":"no"},{"id_pregunta":"7","pregunta":"What needs to be guaranteed when developing an application?","respuestas":[{"tipo":"texto","respuesta":"The profit","es_correcta":"no","seleccionada":"no"},{"tipo":"texto","respuesta":"The assets","es_correcta":"no","seleccionada":"no"},{"tipo":"texto","respuesta":"The security","es_correcta":"si","seleccionada":"no"},{"tipo":"texto","respuesta":"The computers","es_correcta":"no","seleccionada":"no"}],"justificacion":"","pista":"","correcta":"no","seleccionada":"no"},{"id_pregunta":"8","pregunta":"What makes the applications designed differently?","respuestas":[{"tipo":"texto","respuesta":"The engineer","es_correcta":"no","seleccionada":"no"},{"tipo":"texto","respuesta":"The environment","es_correcta":"si","seleccionada":"no"},{"tipo":"texto","respuesta":"The user","es_correcta":"no","seleccionada":"no"},{"tipo":"texto","respuesta":"The network","es_correcta":"no","seleccionada":"no"}],"justificacion":"","pista":"","correcta":"no","seleccionada":"no"},{"id_pregunta":"9","pregunta":"Is Code Access Security an infrastructure?","respuestas":[{"tipo":"texto","respuesta":"No, it isn’t.","es_correcta":"no","seleccionada":"no"},{"tipo":"texto","respuesta":"Yes, it does.","es_correcta":"no","seleccionada":"no"},{"tipo":"texto","respuesta":"No, it doesn’t.","es_correcta":"no","seleccionada":"no"},{"tipo":"texto","respuesta":"Yes, it is.","es_correcta":"si","seleccionada":"no"}],"justificacion":"","pista":"","correcta":"no","seleccionada":"no"}]}';
var piezas_txt = '{"piezas":[{"id_pieza":"assets/img/img_pieza1.png"},{"id_pieza":"assets/img/img_pieza2.png"},{"id_pieza":"assets/img/img_pieza3.png"},{"id_pieza":"assets/img/img_pieza4.png"},{"id_pieza":"assets/img/img_pieza5.png"},{"id_pieza":"assets/img/img_pieza6.png"},{"id_pieza":"assets/img/img_pieza7.png"},{"id_pieza":"assets/img/img_pieza8.png"},{"id_pieza":"assets/img/img_pieza9.png"}]}';
//FIN VARIABLES GENERALES

//VARIABLES DE LA ACTIVIDAD
var preguntas_json = eval("(" + preguntas_txt + ")");
var preguntas_realizadas = new Array();
var pregunta_actual;
var intento_actual = 1;
var piezas_json;

var preguntas_json_original = eval("(" + preguntas_txt + ")");
/*INICIO FUNCIONES PUNTUALES ACTIVIDAD*/

function inicializar_reglas_actividad() {
    $('#cont_descripcion').html(descripcion);
    if (numero_de_preguntas > 1) {
        $('#cont_numero_de_preguntas').html('The activity is composed of ' + numero_de_preguntas + ' questions. This icon will change every time you answer each question.');
    } else {
        $('#cont_numero_de_preguntas').html('The activity is composed of ' + numero_de_preguntas + ' question. This icon will change every time you answer each question.');
    }
    if (numero_de_intentos > 1) {
        $('#cont_numero_de_intentos').html('You have ' + numero_de_intentos + ' attempts to successfully complete the activity.');
    } else {
        $('#cont_numero_de_intentos').html('You have ' + numero_de_intentos + ' attempt to successfully complete the activity.');
    }
    if (exito_puntaje > 1) {
        $('#cont_puntaje').html('To successfully complete this activity, you must get at least ' + exito_puntaje + ' points. Each correct answer gives ');
    } else {
        $('#cont_puntaje').html('To successfully complete this activity, you must get at least ' + exito_puntaje + ' point. Each correct answer gives ');
    }
    if (puntaje > 1) {
        $('#cont_puntaje').html($('#cont_puntaje').html() + ' ' + puntaje + ' points.');
    } else {
        $('#cont_puntaje').html($('#cont_puntaje').html() + ' ' + puntaje + ' point.');
    }
    msg_tiempo = 'This activity has no time limit.';
    if (control_de_tiempo !== '' && control_de_tiempo !== '0') {
        if (control_de_tiempo > 1) {
            msg_tiempo = 'You have  ' + control_de_tiempo + ' seconds to complete the activity.';
        } else {
            msg_tiempo = 'You have  ' + control_de_tiempo + ' second to complete the activity.';
        }
    }
    $('#cont_tiempo').html(msg_tiempo);
    logo_animation();
}

function inicializar_actividad() {
    preguntas_json = JSON.parse(JSON.stringify(preguntas_json_original));
    $('#droppable_rompecabezas').html(generar_piezas());
    piezas_json = eval("(" + piezas_txt + ")");
    piezas_json.piezas.mezclar_preguntas();
    $('#cont_puntos').html("0");
    pregunta_actual = 1;
    inicializa_iconos_preguntas();
    preguntas_json.preguntas.mezclar_preguntas();
    siguiente_pregunta();
    activar_contenedor('cont_actividad');
    activar_cronometro();
    $("#el_div_nuevo").droppable({
        hoverClass: "ui-state-active",
        tolerance: "fit",
        drop: function (event, ui) {
            var id = ui.draggable.attr("id");
            var la_pieza = $('#' + id + ' img');
            var id_a_manipular = la_pieza.attr('id');
            var partes_a = id_a_manipular.split('.png');
            var posicion = partes_a[0].charAt(partes_a[0].length - 1);
            $('#pieza_rompecabezas_' + posicion + '_img').attr('src', '' + la_pieza.attr('src') + '');
            $('#pieza_rompecabezas').remove();
            if (pregunta_actual === numero_de_preguntas) {
                parar_cuenta_regresiva();
                setTimeout(function () {
                    armar_resultados();
                    activar_contenedor('cont_resultados');
                }, 1500);
            } else {
                pregunta_actual++;
                siguiente_pregunta();
                mostrar_modal('modalPregunta');
            }
        }
    });
    mostrar_modal('modalPregunta');
}
/*INICIO FUNCIONES PUNTUALES ACTIVIDAD*/
function siguiente_pregunta() {
    $('#actividad_pista').html('');
    var siguiente_pregunta = preguntas_json.preguntas[pregunta_actual - 1].pregunta;
    if (preguntas_json.preguntas[pregunta_actual - 1].pista !== '') {
        siguiente_pregunta += '<img onclick="interactuar_con_pista(' + pregunta_actual + ');" id="trigger_pista_' + pregunta_actual + '" class="pista_pregunta" alt="Pista" src="../assets/img/img/pista_ico.png">';
        $('#actividad_pista').html('<p class="pista" id="pista_' + pregunta_actual + '" style="display: none;" >' + preguntas_json.preguntas[pregunta_actual - 1].pista + '</p>');
    }
    preguntas_json.preguntas[pregunta_actual - 1].respuestas.mezclar_respuestas();
    var html_preguntas = '';
    for (var i = 0; i < preguntas_json.preguntas[pregunta_actual - 1].respuestas.length; i++) {
        html_preguntas += '<div onclick="activar_respuesta_popup(' + i + ');"><div class="radio_button_pregunta" id="pregunta_radio_' + i + '"></div><div class="option_pregunta" id="pregunta_txt_' + i + '">' + preguntas_json.preguntas[pregunta_actual - 1].respuestas[i].respuesta + '</div></div>';
    }
    $('#cont_preguntas_actividad').html(html_preguntas);
    $('#titulo_txt_pregunta').html(siguiente_pregunta);
    $('#respuesta_seleccionada').val('-1');
    $('#btn_responder_pregunta').css('display', 'none');
}
function activar_respuesta_popup(id_popup) {
    for (var i = 0; i < preguntas_json.preguntas[pregunta_actual - 1].respuestas.length; i++) {
        if (i === id_popup) {
            $('#pregunta_radio_' + i).html('<div class="active_radio_center_pregunta"></div>');
        } else {
            $('#pregunta_radio_' + i).html('');
        }
    }
    $('#respuesta_seleccionada').val(id_popup);
    $('#btn_responder_pregunta').css('display', 'block');
}
function responder_pregunta() {
    preguntas_json.preguntas[pregunta_actual - 1].respuestas[($('#respuesta_seleccionada').val())].seleccionada = 'si';
    if (preguntas_json.preguntas[pregunta_actual - 1].respuestas[($('#respuesta_seleccionada').val())].es_correcta === 'si') {
        preguntas_json.preguntas[pregunta_actual - 1].correcta = 'si';
        activar_estrella(pregunta_actual, 'exito');
        puntaje_actual = parseInt(puntaje_actual) + parseInt(puntaje);
        $('#cont_puntos').html(parseInt(puntaje_actual));
        var pieza_seleccionada = piezas_json.piezas[(pregunta_actual - 1)].id_pieza;
        var pieza_rompecabezas = '<div id="pieza_rompecabezas"><img id="' + pieza_seleccionada + '" src="' + pieza_seleccionada + '" alt="Imagen"/></div>';
        $('#contenedor_pieza_rompecabezas').html(pieza_rompecabezas);
        $('#pieza_rompecabezas').draggable({
            revert: "invalid"
        });
        if (pieza_seleccionada.indexOf("01.png") !== -1) {
            $('#pieza_rompecabezas').addClass('pieza_romp_corner');
        } else if (pieza_seleccionada.indexOf("02.png") !== -1) {
            $('#pieza_rompecabezas').addClass('pieza_romp_medium');
        } else if (pieza_seleccionada.indexOf("03.png") !== -1) {
            $('#pieza_rompecabezas').addClass('pieza_romp_corner');
        } else if (pieza_seleccionada.indexOf("04.png") !== -1) {
            $('#pieza_rompecabezas').addClass('pieza_romp_medium');
        } else if (pieza_seleccionada.indexOf("05.png") !== -1) {
            $('#pieza_rompecabezas').addClass('pieza_romp_center');
        } else if (pieza_seleccionada.indexOf("06.png") !== -1) {
            $('#pieza_rompecabezas').addClass('pieza_romp_medium');
        } else if (pieza_seleccionada.indexOf("07.png") !== -1) {
            $('#pieza_rompecabezas').addClass('pieza_romp_corner');
        } else if (pieza_seleccionada.indexOf("08.png") !== -1) {
            $('#pieza_rompecabezas').addClass('pieza_romp_medium');
        } else if (pieza_seleccionada.indexOf("09.png") !== -1) {
            $('#pieza_rompecabezas').addClass('pieza_romp_corner');
        }
    } else {
        preguntas_json.preguntas[pregunta_actual - 1].correcta = 'no';
        activar_estrella(pregunta_actual, 'fallo');
        if (pregunta_actual === numero_de_preguntas) {
            parar_cuenta_regresiva();
            setTimeout(function () {
                armar_resultados();
                activar_contenedor('cont_resultados');
            }, 1500);
        } else {
            pregunta_actual++;
            siguiente_pregunta();
            setTimeout(function () {
                mostrar_modal('modalPregunta');
            }, 1000);
        }
    }
}
/*FIN FUNCIONES PUNTUALES ACTIVIDAD*/

/*DE ACA EN ADELANTE ESTAN LAS FUNCIONES GENERICAS*/
function mostrar_mensaje_de_informacion(mensaje_a_mostrar) {
    $('#cont_mensaje_interno_txt').html(mensaje_a_mostrar);
    $('#ahogado_actividad').css('display', 'none');
    $('#cont_mensaje_interno').fadeIn(1500);
}
function ocultar_mensaje_de_informacion() {
    $('#ahogado_actividad').css('display', 'block');
    $('#cont_mensaje_interno').css('display', 'none');
}
function reintentar() {
    preguntas_realizadas = new Array();
    $('#cont_puntos').html("0");
    puntaje_actual = "0";
    intento_actual++;
    inicializar_actividad();
}

function activar_estrella(num_pregunta, estado) {
    var obj_pregunta = $('#pregunta_' + num_pregunta);
    var imagen = '../assets/img/estrella_exito.png';
    var titulo = "CORRECT";
    if (estado === 'fallo') {
        imagen = '../assets/img/estrella_fallo.png';
        titulo = "INCORRECT";
    } else {
        preguntas_json.preguntas[pregunta_actual - 1].correcta = 'si';
    }
    preguntas_realizadas.push(preguntas_json.preguntas[pregunta_actual - 1]);
    obj_pregunta.fadeOut(500, function () {
        obj_pregunta.attr("src", imagen);
        obj_pregunta.attr("title", titulo);
        obj_pregunta.fadeIn(500);
    });
}

function inicializa_iconos_preguntas() {
    var html_txt = '';
    for (var i = 1; i <= parseInt(numero_de_preguntas); i++) {
        html_txt += '<div class="pregunta_' + i + '"><img title="QUESTION ' + i + '" id="pregunta_' + i + '" src="../assets/img/estrella_turno_actual.png" alt="Icono"/></div>';
    }
    $('.preguntas').html(html_txt);
}

function activar_contenedor(contenedor) {
    if (contenedor === 'cont_actividad') {
        $('#cont_actividad').fadeIn(1000);
        $('#inicio_actividad').fadeOut(1000);
        $('#cont_resultados').fadeOut(1000);
    } else if (contenedor === 'inicio_actividad') {
        $('#cont_actividad').fadeOut(1000);
        $('#inicio_actividad').fadeIn(1000);
        $('#cont_resultados').fadeOut(1000);
    } else if (contenedor === 'cont_resultados') {
        $('#cont_actividad').fadeOut(1000);
        $('#inicio_actividad').fadeOut(1000);
        $('#cont_resultados').fadeIn(1000);
    } else {
        console.log('ERROR GARRAFAL. NO LLEGO TIPO DE CONTENEDOR. CONTACTE AL PROVEEDOR DEL SOFTWARE.');
        return false;
    }
}

function armar_resultados() {
    ocultar_modal('modalPregunta');
    if (puntaje_actual >= exito_puntaje) {
        $('#txt_pagina_resultados').html('Success <img src="../assets/img/mano_arriba.png" alt="Success"/>');
        $('.resultados_preguntas').css('display', 'block');
        $('.resultados_preguntas').html(calcular_resultados());
        $('.cont_reintentar').css('display', 'none');
    } else {
        if (intento_actual === numero_de_intentos) {
            $('#txt_pagina_resultados').html('Failure <img src="../assets/img/mano_abajo.png" alt="Failure"/>');
            $('.resultados_preguntas').css('display', 'block');
            $('.resultados_preguntas').html(calcular_resultados());
            $('.cont_reintentar').css('display', 'none');
        } else {
            $('.resultados_preguntas').css('display', 'none');
            $('.cont_reintentar').css('display', 'block');
            if ((numero_de_intentos - intento_actual) > 1) {
                msg_intentos = "You have " + (numero_de_intentos - intento_actual) + " attempts left.";
            } else {
                msg_intentos = "You have 1 try.";
            }
            $('#cantidad_intentos_restantes').html(msg_intentos);
        }
    }
}

function calcular_resultados() {
    var resultados = '';
    var tu_respuesta;
    var respuesta_correcta;
    var class_respuesta;
    var imagen_respuesta;
    if (preguntas_realizadas.length > 0) {
        for (var i = 0; i < preguntas_realizadas.length; i++) {
            resultados += '<div class="cont_pregunta">';
            resultados += '<p class="numero_pregunta">' + preguntas_realizadas[i].pregunta + '</p>';
            for (var j = 0; j < preguntas_realizadas[i].respuestas.length; j++) {
                if (preguntas_realizadas[i].respuestas[j].seleccionada === 'si') {
                    tu_respuesta = preguntas_realizadas[i].respuestas[j].respuesta;
                }
                if (preguntas_realizadas[i].respuestas[j].es_correcta === 'si') {
                    respuesta_correcta = preguntas_realizadas[i].respuestas[j].respuesta;
                }
            }
            if (preguntas_realizadas[i].correcta === 'si') {
                class_respuesta = 'txt_respuesta_correcta';
                imagen_respuesta = 'estrella_exito.png';
            } else {
                class_respuesta = 'txt_respuesta_incorrecta';
                imagen_respuesta = 'estrella_fallo.png';
            }
            resultados += '<p class="subtitulo_respuesta_txt">You answer:&nbsp;&nbsp;<span class="' + class_respuesta + '">' + tu_respuesta + '</span></p>';
            resultados += '<p class="subtitulo_respuesta_txt">Correct answer:&nbsp;&nbsp;<span>' + respuesta_correcta + '</span></p>';
            if (preguntas_realizadas[i].justificacion !== '') {
                resultados += '<p class="subtitulo_respuesta_txt">Justification: <span class="justificacion">' + preguntas_realizadas[i].justificacion + '</span></p>';
            }
            resultados += '<img src="../assets/img/' + imagen_respuesta + '" alt="Imagen"/>';
            resultados += '</div>';
        }
    } else {
        resultados = '<div style="font-size:xx-large;text-align:center;"><span id="cantidad_intentos_restantes">the time is over and there are no more attempts.</span></div>';
    }
    return resultados;
}

function perdio_por_tiempo() {
    activar_contenedor('cont_resultados');
    armar_resultados();
}
function generar_piezas() {
    var html = '<div class="el_div_nuevo" id="el_div_nuevo"></div><div>';
    html += '<div id="pieza_rompecabezas_1">';
    html += '<img id="pieza_rompecabezas_1_img" src="assets/img/borde_pieza1.png" alt="Imagen"/>';
    html += '</div>';
    html += '<div id="pieza_rompecabezas_2">';
    html += '<img id="pieza_rompecabezas_2_img" src="assets/img/borde_pieza2.png" alt="Imagen"/>';
    html += '</div>';
    html += '<div id="pieza_rompecabezas_3">';
    html += '<img id="pieza_rompecabezas_3_img" src="assets/img/borde_pieza3.png" alt="Imagen"/>';
    html += '</div>';
    html += '</div>';
    html += '<div>';
    html += '<div id="pieza_rompecabezas_4">';
    html += '<img id="pieza_rompecabezas_4_img" src="assets/img/borde_pieza4.png" alt="Imagen"/>';
    html += '</div>';
    html += '<div id="pieza_rompecabezas_5">';
    html += '<img id="pieza_rompecabezas_5_img" src="assets/img/borde_pieza5.png" alt="Imagen"/>';
    html += '</div>';
    html += '<div id="pieza_rompecabezas_6">';
    html += '<img id="pieza_rompecabezas_6_img" src="assets/img/borde_pieza6.png" alt="Imagen"/>';
    html += '</div>';
    html += '</div>';
    html += '<div>';
    html += '<div id="pieza_rompecabezas_7">';
    html += '<img id="pieza_rompecabezas_7_img" src="assets/img/borde_pieza7.png" alt="Imagen"/>';
    html += '</div>';
    html += '<div id="pieza_rompecabezas_8">';
    html += '<img id="pieza_rompecabezas_8_img" src="assets/img/borde_pieza8.png" alt="Imagen"/>';
    html += '</div>';
    html += '<div id="pieza_rompecabezas_9">';
    html += '<img id="pieza_rompecabezas_9_img" src="assets/img/borde_pieza9.png" alt="Imagen"/>';
    html += '</div>';
    html += '</div>';
    return html;
}
/*INICIO FUNCIONES DEL CRONOMETRO*/
function activar_cronometro() {
    if (control_de_tiempo > 0) {
        $('.tiempo_actividad').css('display', 'block');
        inicio_cuenta_regresiva(control_de_tiempo);
    } else {
        $('.tiempo_actividad').css('display', 'none');
    }
}
function inicio_cuenta_regresiva(control_de_tiempo) {
    if (typeof control !== 'undefined') {
        reinicio_cuenta_regresiva(control_de_tiempo);
    } else {
        segundos = control_de_tiempo;
        control = setInterval(cuenta_regresiva, 1000);
    }
}
function parar_cuenta_regresiva() {
    if (control_de_tiempo > 0) {
        clearInterval(control);
    }
}
function reinicio_cuenta_regresiva(control_de_tiempo) {
    clearInterval(control);
    segundos = control_de_tiempo;
    $('#cont_segundos').html(segundos);
    control = setInterval(cuenta_regresiva, 1000);
}
function cuenta_regresiva() {
    $('#cont_segundos').html(segundos);
    if (segundos === 0) {
        parar_cuenta_regresiva();
        perdio_por_tiempo();
    } else {
        segundos--;
    }
}
/*FIN FUNCIONES DEL CRONOMETRO*/

Array.prototype.mezclar_preguntas = function () {
    var m = this.length - 1;
    for (var i = m; i > 1; i--) {
        var alea = Math.floor(i * Math.random());
        var temp = this[i];
        this[i] = this[alea];
        this[alea] = temp;
    }
};
Array.prototype.mezclar_respuestas = function () {
    var m = this.length - 1;
    for (var i = m; i > 1; i--) {
        var alea = Math.floor(i * Math.random());
        var temp = this[i];
        this[i] = this[alea];
        this[alea] = temp;
    }
};

$(window).load(setTimeout(inicializar_reglas_actividad(), 1000));