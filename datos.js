/* Datos de la oferta de cursos — Facultad de Educación, Uniandes.
   Se edita desde admin.html. Si lo editas a mano, conserva el formato JSON.

   categoria = pregrado | posgrado; tipo = LIC | MS | ESP | DOC;
   track (solo MS) = profundizacion | investigacion | compartido;
   secciones[].profesores = ids de profesores. */

window.OFERTA = {
  "cursos": [
    {
      "id": "c90",
      "titulo": "SEMILLERO EDU+IA",
      "categoria": "pregrado",
      "tipo": "LIC",
      "codigo": "EDUC-1114",
      "creditos": 1,
      "semanas": 16,
      "modalidad": "HÍBRIDA",
      "imagen": "media/course-90.png",
      "descripcion": [
        "Ser un espacio de pensamiento crítico y acción transformadora frente a la integración de la",
        "inteligencia artificial generativa (IAGen) en la educación. Este semillero busca formar",
        "educadorxs que usan la IA como interlocutora pedagógica, comprendiendo la importancia de",
        "fomentar, ejercer y cultivar la agencia humana en el centro de las decisiones educativas.",
        "Promovemos la co-inteligencia, la alfabetización digital crítica y situada, y el diseño de futuros",
        "educativos deseables centrados en el ser humano."
      ],
      "obligatoriaEn": [],
      "electivaEn": [],
      "secciones": [
        {
          "nrc": "84910",
          "horario": [],
          "profesores": [
            "p18"
          ]
        }
      ]
    },
    {
      "id": "c89",
      "titulo": "NEURODESARROLLO Y REGULACIÓN EMOCIONAL EN LA PRIMERA IFANCIA",
      "categoria": "pregrado",
      "tipo": "LIC",
      "codigo": "EDUC-2014",
      "creditos": 3,
      "semanas": 16,
      "modalidad": "PRESENCIAL",
      "imagen": "media/course-89.webp",
      "descripcion": [
        "Este curso aborda los principales aportes de las neurociencias del desarrollo para comprender cómo se construyen los procesos cognitivos, sociales y emocionales durante la primera infancia. A partir de una perspectiva interdisciplinaria, se estudiarán el desarrollo y la arquitectura cerebral, las relaciones tempranas, el estrés y la adversidad, así como los procesos y estrategias de regulación emocional y su influencia en el aprendizaje y el bienestar infantil. El curso busca que los futuros licenciados desarrollen una comprensión fundamentada del desarrollo infantil y fortalezcan sus capacidades para promover interacciones y ambientes educativos sensibles, seguros y emocionalmente favorecedores para niños y niñas.",
        "Este curso se concibe como un puente explícito entre la neurociencia del desarrollo y la práctica pedagógica: cada bloque conceptual se acompaña de un caso aplicado, de manera que los estudiantes no solo comprendan los procesos cerebrales y emocionales de la primera infancia, sino que aprendan a traducirlos en decisiones, interacciones y estrategias de aula fundamentadas en evidencia."
      ],
      "obligatoriaEn": [],
      "electivaEn": [],
      "secciones": [
        {
          "nrc": "",
          "horario": [
            {
              "dia": "MIÉRCOLES",
              "inicio": "5:00 PM",
              "fin": "7:50PM"
            }
          ],
          "profesores": [
            "p20"
          ]
        }
      ]
    },
    {
      "id": "c88",
      "titulo": "CBU - MENTALIDAD DE CRECIMIENTO, APRENDIZAJE Y CONEXIONES HUMANAS",
      "categoria": "pregrado",
      "tipo": "LIC",
      "codigo": "CBUH-1026",
      "creditos": 3,
      "semanas": 16,
      "modalidad": "PRESENCIAL",
      "imagen": "media/course-88.webp",
      "descripcion": [],
      "obligatoriaEn": [],
      "electivaEn": [],
      "secciones": [
        {
          "nrc": "84632",
          "horario": [
            {
              "dia": "LUNES",
              "inicio": "2:00 PM",
              "fin": "3:20 PM"
            },
            {
              "dia": "MIÉRCOLES",
              "inicio": "2:00 PM",
              "fin": "3:20 PM"
            }
          ],
          "profesores": [
            "p18"
          ]
        }
      ]
    },
    {
      "id": "c87",
      "titulo": "CBU - EDUCACIÓN Y DEMOCRACIA",
      "categoria": "pregrado",
      "tipo": "LIC",
      "codigo": "CBUH-1158",
      "creditos": 3,
      "semanas": 16,
      "modalidad": "PRESENCIAL",
      "imagen": "media/course-87.webp",
      "descripcion": [],
      "obligatoriaEn": [],
      "electivaEn": [],
      "secciones": [
        {
          "nrc": "84803",
          "horario": [
            {
              "dia": "MIÉRCOLES",
              "inicio": "11:00 AM",
              "fin": "12:20 PM"
            },
            {
              "dia": "VIERNES",
              "inicio": "11:00 AM",
              "fin": "12:20 PM"
            }
          ],
          "profesores": [
            "p17"
          ]
        }
      ]
    },
    {
      "id": "c86",
      "titulo": "CBU - PENSAR, SENTIR Y APRENDER EN TIEMPOS DE IA",
      "categoria": "pregrado",
      "tipo": "LIC",
      "codigo": "CBUT-1029",
      "creditos": 3,
      "semanas": 16,
      "modalidad": "PRESENCIAL",
      "imagen": "media/course-86.webp",
      "descripcion": [],
      "obligatoriaEn": [],
      "electivaEn": [],
      "secciones": [
        {
          "nrc": "84635",
          "horario": [
            {
              "dia": "LUNES",
              "inicio": "15:30",
              "fin": "16:50"
            },
            {
              "dia": "MIÉRCOLES",
              "inicio": "15:30",
              "fin": "16:50"
            }
          ],
          "profesores": [
            "p18"
          ]
        }
      ]
    },
    {
      "id": "c85",
      "titulo": "CBU -EXPERIMENTOS DE POLÍTICA SOCIAL: ¿QUÉ SABEMOS Y A DÓNDE VAMOS?",
      "categoria": "pregrado",
      "tipo": "LIC",
      "codigo": "CBUT-1116",
      "creditos": 3,
      "semanas": 16,
      "modalidad": "PRESENCIAL",
      "imagen": "media/course-85.webp",
      "descripcion": [],
      "obligatoriaEn": [],
      "electivaEn": [],
      "secciones": [
        {
          "nrc": "84722",
          "horario": [
            {
              "dia": "MARTES",
              "inicio": "9:30 AM",
              "fin": "10:50 AM"
            },
            {
              "dia": "JUEVES",
              "inicio": "9:30 AM",
              "fin": "10:50 AM"
            }
          ],
          "profesores": [
            "p16"
          ]
        }
      ]
    },
    {
      "id": "c84",
      "titulo": "TEORÍAS Y RETOS DEL APRENDIZAJE",
      "categoria": "pregrado",
      "tipo": "LIC",
      "codigo": "EDUC-1100",
      "creditos": 4,
      "semanas": 16,
      "modalidad": "PRESENCIAL",
      "imagen": "media/course-84.webp",
      "descripcion": [
        "El aprendizaje es uno de los procesos psicológicos más intrigantes. Por una parte, es central a la adaptación de los organismos al ambiente y por esta razón pasa desapercibido. Por otro lado, requiere condiciones muy precisas para su ocurrencia y es relativamente raro en ciertas condiciones. Además, es el producto de complejos procesos biológicos, cognitivos y socioculturales. Pero, sobre todo, el aprendizaje es, en últimas, una condición necesaria para el logro de los objetivos educativos y para la recreación permanente de la cultura.",
        "Dicho de manera simple, sin aprendizaje no hay educación. ¿Qué es el aprendizaje? ¿Cómo ocurre? ¿Cómo podemos promover el aprendizaje y saber que alguien ha aprendido?",
        "En este curso estudiaremos las principales teorías que han intentado responder estas preguntas: las teorías conductistas, las teorías cognitivas y la teoría sociocultural. Este recorrido nos llevará a comprender que no hay una única respuesta para esas preguntas y que, por el contrario, el aprendizaje ha sido definido y explicado de diferentes maneras.",
        "Este curso parte de la idea de que todas esas teorías tienen fortalezas que deben ser valoradas cuando se trata de entender los problemas que supone la educación. Adicionalmente, al estudiar esas teorías veremos que, aunque solo algunas de ellas hicieron planteamientos explícitos para la educación, todas tienen implicaciones importantes para la práctica pedagógica.",
        "A lo largo del curso prestaremos especial atención a esas implicaciones para que, al final del semestre, cada uno de los estudiantes comprenda el lugar que esas teorías puede tener en la práctica pedagógica."
      ],
      "obligatoriaEn": [],
      "electivaEn": [],
      "secciones": [
        {
          "nrc": "74944",
          "horario": [
            {
              "dia": "VIERNES",
              "inicio": "8:00 AM",
              "fin": "9:50 AM"
            },
            {
              "dia": "MIÉRCOLES",
              "inicio": "8:00 AM",
              "fin": "9:50 AM"
            }
          ],
          "profesores": [
            "p15"
          ]
        }
      ]
    },
    {
      "id": "c83",
      "titulo": "DIVERSIDAD Y EDUCACIÓN",
      "categoria": "pregrado",
      "tipo": "LIC",
      "codigo": "EDUC-1103",
      "creditos": 3,
      "semanas": 16,
      "modalidad": "PRESENCIAL",
      "imagen": "media/course-83.webp",
      "descripcion": [
        "Una educación de calidad valora la diversidad y genera equidad de oportunidades para que todos los integrantes de la comunidad educativa participen y aporten a los procesos de enseñanza-aprendizaje que les unen. Sin embargo, históricamente, la educación ha tendido a homogeneizar a los estudiantes y promover epistemologías hegemónicas, por lo tanto se han generado procesos de exclusión. Este contexto convoca a los educadores a pensarse ¿cómo transformar la educación para lograr procesos incluyentes, que reconozcan y acojan la diversidad humana? En este curso analizaremos las distintas formas en que marcadores de identidad interactúan con las prácticas culturales de exclusión en la educación y las posibilidades de una educación inclusiva."
      ],
      "obligatoriaEn": [],
      "electivaEn": [],
      "secciones": [
        {
          "nrc": "82465",
          "horario": [
            {
              "dia": "JUEVES",
              "inicio": "2:00 PM",
              "fin": "4:50 PM"
            }
          ],
          "profesores": [
            "p14"
          ]
        }
      ]
    },
    {
      "id": "c82",
      "titulo": "SEMILLERO DE INVESTIGACION",
      "categoria": "pregrado",
      "tipo": "LIC",
      "codigo": "EDUC-2000",
      "creditos": 3,
      "semanas": 16,
      "modalidad": "VIRTUAL",
      "imagen": "media/course-82.webp",
      "descripcion": [
        "Este curso busca brindar a los/as estudiantes la oportunidad de participar de primera mano en actividades investigativas del grupo de investigación en educación para la primera infancia. Esto implica aproximarse de manera crítica a diferentes herramientas, metodologías y temáticas, así como hacer parte activa de distintas fases del proceso investigativo."
      ],
      "obligatoriaEn": [],
      "electivaEn": [],
      "secciones": [
        {
          "nrc": "83155",
          "horario": [],
          "profesores": []
        }
      ]
    },
    {
      "id": "c81",
      "titulo": "MINDSET LAB",
      "categoria": "pregrado",
      "tipo": "LIC",
      "codigo": "EDUC-2002",
      "creditos": 1,
      "semanas": 16,
      "modalidad": "VIRTUAL",
      "imagen": "media/course-81.webp",
      "descripcion": [
        "Si desea inscribir el curso debe conversarlo con la profesora Paula García (pb.garcia@uniandes.edu.co)"
      ],
      "obligatoriaEn": [],
      "electivaEn": [],
      "secciones": [
        {
          "nrc": "81683",
          "horario": [],
          "profesores": [
            "p14"
          ]
        }
      ]
    },
    {
      "id": "c80",
      "titulo": "SEMILLERO DE INVESTIGACIÓN",
      "categoria": "pregrado",
      "tipo": "LIC",
      "codigo": "EDUC-2004",
      "creditos": 2,
      "semanas": 16,
      "modalidad": "VIRTUAL",
      "imagen": "media/course-80.webp",
      "descripcion": [
        "Este curso busca brindar a los/as estudiantes la oportunidad de participar de primera mano en actividades investigativas del grupo de investigación en educación para la primera infancia. Esto implica aproximarse de manera crítica a diferentes herramientas, metodologías y temáticas, así como hacer parte activa de distintas fases del proceso investigativo."
      ],
      "obligatoriaEn": [],
      "electivaEn": [],
      "secciones": [
        {
          "nrc": "82467",
          "horario": [],
          "profesores": []
        }
      ]
    },
    {
      "id": "c79",
      "titulo": "INVESTIGACIÓN EN EDUCACIÓN",
      "categoria": "pregrado",
      "tipo": "LIC",
      "codigo": "EDUC-2007",
      "creditos": 2,
      "semanas": 16,
      "modalidad": "PRESENCIAL",
      "imagen": "media/course-79.webp",
      "descripcion": [],
      "obligatoriaEn": [],
      "electivaEn": [],
      "secciones": [
        {
          "nrc": "82468",
          "horario": [
            {
              "dia": "VIERNES",
              "inicio": "11:00 AM",
              "fin": "12:50 PM"
            }
          ],
          "profesores": [
            "p13"
          ]
        }
      ]
    },
    {
      "id": "c78",
      "titulo": "INVESTIGACIÓN ACCIÓN EN EL AULA",
      "categoria": "pregrado",
      "tipo": "LIC",
      "codigo": "EDUC-2011",
      "creditos": 3,
      "semanas": 16,
      "modalidad": "PRESENCIAL",
      "imagen": "media/course-78.webp",
      "descripcion": [
        "El curso Investigación Acción busca que el estudiante: comprenda las fases y procesos inherentes al ciclo de la investigación acción y aplique estos conocimientos a la reflexión continua que permita la transformación, rediseño y permanente evaluación de su práctica como profesional de la educación; caracterice, reflexione, diseñe e intervenga su entorno educativo con el fin de transformarlo de manera crítica y participativa; y reflexione de manera sistemática sobre su práctica educativa mediante el uso de diferentes técnicas de recolección y análisis para resolver problemas transformándolos."
      ],
      "prerrequisitos": "INVESTIGACIÓN EN EDUCACIÓN Y PRÁCTICA FORMATIVA 1.",
      "observaciones": "Solo para estudiantes que cursan cuarto semestre en adelante.",
      "obligatoriaEn": [],
      "electivaEn": [],
      "secciones": [
        {
          "nrc": "83156",
          "horario": [
            {
              "dia": "LUNES",
              "inicio": "5:00 PM",
              "fin": "7:50 PM"
            }
          ],
          "profesores": [
            "p12"
          ]
        }
      ]
    },
    {
      "id": "c77",
      "titulo": "CALIDAD DE LAS INTERACCIONES EN LA PRIMERA INFANCIA",
      "categoria": "pregrado",
      "tipo": "LIC",
      "codigo": "EDUC-2018",
      "creditos": 3,
      "semanas": 16,
      "modalidad": "PRESENCIAL",
      "imagen": "media/course-77.webp",
      "descripcion": [],
      "observaciones": "Solo para estudiantes que cursan Licenciatura en Educación Infantil como primer o segundo programa.",
      "obligatoriaEn": [
        "Licenciatura en Educación Infantil"
      ],
      "electivaEn": [],
      "secciones": [
        {
          "nrc": "82469",
          "horario": [
            {
              "dia": "MARTES",
              "inicio": "5:00 PM",
              "fin": "7:50 PM"
            }
          ],
          "profesores": [
            "p11",
            "p6"
          ]
        }
      ]
    },
    {
      "id": "c76",
      "titulo": "EVALUACION DEL APRENDIZAJE",
      "categoria": "pregrado",
      "tipo": "LIC",
      "codigo": "EDUC-2103",
      "creditos": 3,
      "semanas": 16,
      "modalidad": "PRESENCIAL",
      "imagen": "media/course-76.webp",
      "descripcion": [
        "En este curso se espera que los estudiantes se apropien de los principales conceptos y enfoques de la evaluación en el contexto del aprendizaje, adquieran habilidades para el diseño y validación de instrumentos, así como de la interpretación de resultados de evaluación. De igual forma, se espera que reconozcan los efectos que tiene la evaluación sobre las personas, así como los valores e intereses que subyacen al ejercicio de la evaluación. En concordancia con lo anterior, este curso está propuesto desde un enfoque de aprendizaje orientado por proyectos, en el que los estudiantes sitúan un contexto de intervención en el cual diseñan e implementan una propuesta de evaluación, lo cual les permite desarrollar las competencias propuestas."
      ],
      "prerrequisitos": "PRÁCTICA FORMATIVA 1.",
      "observaciones": "Solo para estudiantes que cursan cuarto semestre en adelante.",
      "obligatoriaEn": [],
      "electivaEn": [],
      "secciones": [
        {
          "nrc": "82471",
          "horario": [
            {
              "dia": "VIERNES",
              "inicio": "2:00 PM",
              "fin": "4:50 PM"
            }
          ],
          "profesores": [
            "p10"
          ]
        }
      ]
    },
    {
      "id": "c75",
      "titulo": "CLIMA DE AULA Y COMPETENCIAS SOCIOEMOCIONALES",
      "categoria": "pregrado",
      "tipo": "LIC",
      "codigo": "EDUC-2104",
      "creditos": 3,
      "semanas": 16,
      "modalidad": "PRESENCIAL",
      "imagen": "media/course-75.webp",
      "descripcion": [
        "El aula es un espacio dinámico en el que, además de las actividades específicas de enseñanza académica, ocurre una multiplicidad de interacciones igualmente formativas. Los profesores, como líderes de buena parte de las experiencias que suceden en el aula, tienen el reto de manejar (gestionar) el aula para garantizar que los estudiantes aprovechen al máximo las oportunidades de aprendizaje que sus maestros les ofrecen. Aproximaciones recientes amplían la visión tradicional del manejo de aula para considerarlo como las acciones que los docentes realizan para crear un ambiente que apoye y facilite tanto el aprendizaje académico como el social, emocional y moral. En otras palabras, el manejo de aula no sólo busca establecer y mantener un ambiente ordenado y eficiente para que los estudiantes se involucren en un aprendizaje académico significativo, sino que también busca promover el crecimiento social y moral de los estudiantes. En este curso abordaremos el manejo de aula desde esta perspectiva, desarrollando en sus participantes competencias docentes que les permitan construir un clima de aula propicio para la formación de ciudadanos democráticos: participativos, activos, críticos, autónomos y cuidadosos."
      ],
      "observaciones": "Solo para estudiantes que cursan cuarto semestre en adelante.",
      "obligatoriaEn": [],
      "electivaEn": [],
      "secciones": [
        {
          "nrc": "82472",
          "horario": [
            {
              "dia": "JUEVES",
              "inicio": "5:00 PM",
              "fin": "7:50 PM"
            }
          ],
          "profesores": [
            "p15"
          ]
        }
      ]
    },
    {
      "id": "c74",
      "titulo": "PRÁCTICA FORMATIVA 1",
      "categoria": "pregrado",
      "tipo": "LIC",
      "codigo": "EDUC-2201",
      "creditos": 4,
      "semanas": 16,
      "modalidad": "PRESENCIAL",
      "imagen": "media/course-74.webp",
      "descripcion": [
        "La práctica formativa I, en particular, está orientada al desarrollo de la capacidad de los estudiantes ser observadores sistemáticos, rigurosos y responsables del ambiente social, emocional y de aprendizaje del aula, a través del modelo CLASS (Classroom Assesment Scoring System). Esto les permite a los estudiantes matizar su observación, su juicio y su concepto con los lentes de un profesional crítico, orientado por la búsqueda la excelencia de su profesión y de la construcción una cultura de la ética del cuidado en el aula."
      ],
      "prerrequisitos": "TEORÍAS Y RETOS DEL APRENDIZAJE",
      "observaciones": "Solo para estudiantes que cursan cuarto semestre en adelante.",
      "obligatoriaEn": [],
      "electivaEn": [],
      "secciones": [
        {
          "nrc": "29382",
          "horario": [
            {
              "dia": "MARTES",
              "inicio": "2:00 PM",
              "fin": "4:50 PM"
            }
          ],
          "profesores": [
            "p13"
          ]
        }
      ]
    },
    {
      "id": "c73",
      "titulo": "PRÁCTICA FORMATIVA 2",
      "categoria": "pregrado",
      "tipo": "LIC",
      "codigo": "EDUC-2202",
      "creditos": 4,
      "semanas": 16,
      "modalidad": "PRESENCIAL",
      "imagen": "media/course-73.webp",
      "descripcion": [
        "La práctica formativa II está orientada a analizar los retos de enseñanza y aprendizaje en el aula en función de la fundamentación pedagógica propuesta por la institución educativa. Para el logro de los objetivos propuestos los practicantes realizarán ejercicios de reflexión de la práctica pedagógica del Maestro Mentor y la propia.Los aprendizajes y las experiencias adquiridos en las prácticas formativas I también les permitirá a los practicantes hacer comparaciones sobre las dinámicas de aula en contextos educativos distintos. Los practicantes realizarán un ejercicio de indagación, sobre el componente pedagógico de la institución, sus herramientas de planeación de clases, las del maestro mentor y los productos de aprendizaje de los estudiantes. Todos los practicantes deben trabajar en la dimensión de retos del aprendizaje y enseñanza en el aula y realizar mínimo 4 intervenciones pedagógicas asignadas y acompañadas por el Maestro Mentor tanto en la planeación como en la implementación."
      ],
      "prerrequisitos": "PRÁCTICA FORMATIVA 1. CUMPLIR CON EL 50% DE LOS CURSOS DISCIPLINARES.",
      "observaciones": "Solo para estudiantes que cursan cuarto semestre en adelante.",
      "obligatoriaEn": [],
      "electivaEn": [],
      "secciones": [
        {
          "nrc": "75099",
          "horario": [
            {
              "dia": "MARTES",
              "inicio": "2:00 PM",
              "fin": "4:50 PM"
            }
          ],
          "profesores": [
            "p9",
            "p18"
          ]
        }
      ]
    },
    {
      "id": "c72",
      "titulo": "PRÁCTICA FORMATIVA 3",
      "categoria": "pregrado",
      "tipo": "LIC",
      "codigo": "EDUC-2203",
      "creditos": 4,
      "semanas": 16,
      "modalidad": "PRESENCIAL",
      "imagen": "media/course-72.webp",
      "descripcion": [
        "La práctica formativa III está orientada a que los estudiantes analicen la importancia de articular el direccionamiento estratégico y los procesos de enseñanza y aprendizaje de las instituciones educativas con los referentes (estándares, fines de la educación, objetivos) nacionales e internacionales utilizando información de fuentes primarias y secundarias.Para ello, durante este semestre centramos la reflexión en determinar los puntos de encuentro entre el direccionamiento estratégico y los procesos de enseñanza y aprendizaje de las instituciones de práctica con los fines de la educación, los objetivos por nivel, los lineamientos y estándares publicados por el MEN a nivel nacional; los objetivos educativos del milenio y los propósitos de formación para una ciudadanía global UNESCO a nivel internacional."
      ],
      "prerrequisitos": "PRÁCTICA FORMATIVA 2.",
      "observaciones": "Solo para estudiantes que cursan cuarto semestre en adelante.",
      "obligatoriaEn": [],
      "electivaEn": [],
      "secciones": [
        {
          "nrc": "32300",
          "horario": [
            {
              "dia": "MARTES",
              "inicio": "2:00 PM",
              "fin": "4:50 PM"
            }
          ],
          "profesores": [
            "p16"
          ]
        }
      ]
    },
    {
      "id": "c70",
      "titulo": "RETOS. PEDAGO.DISCI. 1",
      "categoria": "pregrado",
      "tipo": "LIC",
      "codigo": "EDUC-3103",
      "creditos": 3,
      "semanas": 16,
      "modalidad": "PRESENCIAL",
      "imagen": "media/course-70.webp",
      "descripcion": [
        "Durante este curso estaremos reflexionando acerca de la importancia de desarrollar la comprensión en nuestras aulas, hacerlas visibles y así llevar a nuestros estudiantes a alcanzar verdaderas comprensiones que les permitan utilizar los conocimientos de manera creativa y flexible para enfrentar los desafíos del mundo de hoy. Esto lo haremos teniendo como centro la creación de un proyecto de diseño de una intervención en el aula a partir de un reto identificado , si es posible la implementaremos y reflexionaremos sobre los resultados."
      ],
      "correquisitos": "Práctica Profesional 1",
      "obligatoriaEn": [],
      "electivaEn": [],
      "secciones": [
        {
          "nrc": "70494",
          "horario": [
            {
              "dia": "MARTES",
              "inicio": "2:00 PM",
              "fin": "4:50 PM"
            }
          ],
          "profesores": [
            "p7"
          ]
        }
      ]
    },
    {
      "id": "c69",
      "titulo": "RETOS. PEDAGO.DISCI. 2",
      "categoria": "pregrado",
      "tipo": "LIC",
      "codigo": "EDUC-3104",
      "creditos": 3,
      "semanas": 16,
      "modalidad": "PRESENCIAL",
      "imagen": "media/course-69.webp",
      "descripcion": [
        "Durante este curso estaremos reflexionando acerca de la importancia de desarrollar la comprensión en nuestras aulas, hacerlas visibles y así llevar a nuestros estudiantes a alcanzar verdaderas comprensiones que les permitan utilizar los conocimientos de manera creativa y flexible para enfrentar los desafíos del mundo de hoy. Esto lo haremos teniendo como centro el trabajo de grado donde a partir de un reto identificado, se diseñará una secuencia didáctica, la cual se implementará y evaluará."
      ],
      "correquisitos": "Práctica Profesional 2",
      "obligatoriaEn": [],
      "electivaEn": [],
      "secciones": [
        {
          "nrc": "70495",
          "horario": [
            {
              "dia": "MIÉRCOLES",
              "inicio": "2:00 PM",
              "fin": "4:50 PM"
            }
          ],
          "profesores": [
            "p6",
            "p11"
          ]
        }
      ]
    },
    {
      "id": "c68",
      "titulo": "PRÁCTICA.PROFESIONAL 1",
      "categoria": "pregrado",
      "tipo": "LIC",
      "codigo": "EDUC-3105",
      "creditos": 10,
      "semanas": 16,
      "modalidad": "PRESENCIAL",
      "imagen": "media/course-68.webp",
      "descripcion": [
        "La práctica profesional está orientada hacia el análisis e integración de la multiplicidad de dimensiones del mundo escolar y de la intervención pedagógica: los retos de aprendizaje y enseñanza en el aula, los espacios y recursos para el aprendizaje, escuela y familia, la escuela y su contexto, la cultura institucional, el clima escolar, la responsabilidad ética del docente y el sentido social de la educación. Además del trabajo de intervención pedagógica, durante la práctica profesional se desarrolla un ejercicio de investigación acción en el aula, que tiene como producto el trabajo de grado del programa de Licenciatura."
      ],
      "prerrequisitos": "PRÁCTICA FORMATIVA 3, CLIMA DE AULA, EVALUACIÓN DEL APRENDIZAJE Y DISEÑO CURRICULAR. CUMPLIR CON EL 80% DE LOS CURSOS DISCIPLINARES. INGLÉS 06 APROBADO.",
      "obligatoriaEn": [],
      "electivaEn": [],
      "secciones": [
        {
          "nrc": "70496",
          "horario": [
            {
              "dia": "MIÉRCOLES",
              "inicio": "2:00 PM",
              "fin": "4:50 PM"
            }
          ],
          "profesores": [
            "p15"
          ]
        }
      ]
    },
    {
      "id": "c67",
      "titulo": "PRÁCTICA.PROFESIONAL 2",
      "categoria": "pregrado",
      "tipo": "LIC",
      "codigo": "EDUC-3106",
      "creditos": 10,
      "semanas": 16,
      "modalidad": "PRESENCIAL",
      "imagen": "media/course-67.webp",
      "descripcion": [
        "La práctica profesional está orientada hacia el análisis e integración de la multiplicidad de dimensiones del mundo escolar y de la intervención pedagógica: los retos de aprendizaje y enseñanza en el aula, los espacios y recursos para el aprendizaje, escuela y familia, la escuela y su contexto, la cultura institucional, el clima escolar, la responsabilidad ética del docente y el sentido social de la educación. Además del trabajo de intervención pedagógica, durante la práctica profesional se desarrolla un ejercicio de investigación acción en el aula, que tiene como producto el trabajo de grado del programa de Licenciatura."
      ],
      "prerrequisitos": "PRÁCTICA.PROFESIONAL 1. CUMPLIR CON EL 100% DE LOS CURSOS DISCIPLINARES.",
      "obligatoriaEn": [],
      "electivaEn": [],
      "secciones": [
        {
          "nrc": "70497",
          "horario": [
            {
              "dia": "LUNES",
              "inicio": "2:00 PM",
              "fin": "4:50 PM"
            }
          ],
          "profesores": [
            "p11"
          ]
        }
      ]
    },
    {
      "id": "c66",
      "titulo": "EL SENTIDO DE LA EDUCACIÓN",
      "categoria": "pregrado",
      "tipo": "LIC",
      "codigo": "EDUC-3107",
      "creditos": 3,
      "semanas": 16,
      "modalidad": "PRESENCIAL",
      "imagen": "media/course-66.webp",
      "descripcion": [
        "El curso El Sentido de la Educación permite a los estudiantes analizar críticamente y asumir una postura sobre el sentido ético y político de la educación en conexión con su profesión docente. Este curso aporta al propósito de formación socio humanística y científica de la Universidad de los Andes desde un enfoque crítico e integrador. Bajo este marco, el diseño pedagógico y didáctico del curso está orientado a que los y las estudiantes se sensibilicen y amplíen su comprensión sobre la educación, especialmente sobre las problemáticas, las tensiones y los retos que trae consigo para el país y su crecimiento profesional. Concretamente, el laboratorio de este curso tiene como propósito desarrollar una aproximación sistemática a los principios, trabajos y diversas experiencias que permiten pensar el sentido de la educación que se está produciendo en el país, mediante la observación, registro, codificación y análisis de ambientes de aprendizaje, prácticas pedagógicas y procesos del desarrollo humano que se llevan a cabo en diversas regiones e instituciones educativas."
      ],
      "obligatoriaEn": [],
      "electivaEn": [],
      "secciones": [
        {
          "nrc": "82473",
          "horario": [
            {
              "dia": "JUEVES",
              "inicio": "8:00 AM",
              "fin": "10:50 AM"
            }
          ],
          "profesores": [
            "p12"
          ]
        }
      ]
    },
    {
      "id": "c65",
      "titulo": "LA EDUCACIÓN EN COLOMBIA",
      "categoria": "pregrado",
      "tipo": "LIC",
      "codigo": "EDUC-3108",
      "creditos": 3,
      "semanas": 16,
      "modalidad": "PRESENCIAL",
      "imagen": "media/course-65.webp",
      "descripcion": [
        "Que la educación sea un componente clave para el desarrollo de los individuos y las naciones es el resultado de un proceso histórico de luchas por adquirir un derecho que no siempre se consideró como tal. En este curso analizamos, desde la perspectiva del derecho a la educación, cómo se ha configurado, pero también abrimos una discusión sobre algunas de las principales controversias que son la base para estructurar la política pública contemporánea. Por medio de debates grupales y un proyecto de indagación individual, los estudiantes en este curso podrán introducirse al campo de la educación en Colombia y desarrollar una lectura crítica, reflexiva y ligada a su propia trayectoria educativa."
      ],
      "obligatoriaEn": [],
      "electivaEn": [],
      "secciones": [
        {
          "nrc": "82474",
          "horario": [
            {
              "dia": "MARTES",
              "inicio": "8:00 AM",
              "fin": "10:50 AM"
            }
          ],
          "profesores": [
            "p7"
          ]
        }
      ]
    },
    {
      "id": "c64",
      "oculto": true,
      "titulo": "CURRICULO Y PEDAGOGIA",
      "categoria": "posgrado",
      "tipo": "MS",
      "codigo": "EDUC-4017",
      "creditos": 4,
      "semanas": 16,
      "modalidad": "VIRTUAL",
      "imagen": "media/course-64.webp",
      "descripcion": [
        "En muchas ocasiones, el concepto de currículo se asocia al diseño de estándares educativos y a planes de estudios que se imponen desde la política pública. Esto ha generado unas tensiones permanentes entre los profesores y esa noción tradicional del currículo. En este curso se analizan de manera crítica y propositiva diferentes perspectivas curriculares y la manera cómo éstas permiten redefinir el concepto de currículo, para invitar a los participantes a repensar tanto los fines de la educación como las prácticas pedagógicas. A partir de esto, el curso busca que los participantes reflexionen acerca de y reconstruyan sus propios conceptos y perspectivas sobre el currículo y la pedagogía; generen un compromiso con su rol personal como agente constructor de currículo; evalúen currículos de manera crítica y sustentada; y propongan acciones de transformación de sus propios currículos."
      ],
      "obligatoriaEn": [
        "Todos los posgrados"
      ],
      "electivaEn": [],
      "secciones": [
        {
          "nrc": "79675",
          "horario": [
            {
              "dia": "SÁBADO",
              "inicio": "10:00 AM",
              "fin": "12:50 PM"
            }
          ],
          "profesores": []
        }
      ]
    },
    {
      "id": "c63",
      "titulo": "MÉTODOS CUALITATIVOS DE INVESTIGACIÓN",
      "categoria": "posgrado",
      "tipo": "MS",
      "codigo": "EDUC-4027",
      "creditos": 4,
      "semanas": 16,
      "modalidad": "PRESENCIAL",
      "imagen": "media/course-63.webp",
      "descripcion": [
        "El propósito de este curso es introducir al estudiante a los diseños y métodos de investigación cualitativa en educación. Discutiremos las características generales de la investigación cualitativa y exploraremos diferentes métodos de investigación, tales como estudios de caso, etnografía, investigación acción, y veremos estrategias de recolección de información concretas como entrevistas, grupos focales, observaciones, análisis de documentos, entre otros. Exploraremos diferentes alternativas para analizar la información recolectada para un estudio de investigación cualitativa. Para ello, conoceremos las perspectivas y formas de hacer análisis cualitativa, veremos diferentes maneras de codificar datos cualitativos, como visualizar y organizar datos cualitativos, como generar interpretaciones y conclusiones con rigor y calidad, y finalmente como preparar y presentar los resultados de una investigación."
      ],
      "obligatoriaEn": [
        "Maestría en Educación – Investigación (semipresencial)",
        "Doctorado en Educación"
      ],
      "electivaEn": [
        "Maestría en Educación – Profundización (semipresencial)",
        "Maestría en Educación – Profundización (virtual)",
        "Especialización en Innovación Curricular y Pedagógica",
        "Especialización en Liderazgo y Política Educativa"
      ],
      "secciones": [
        {
          "nrc": "82475",
          "horario": [
            {
              "dia": "SÁBADO",
              "inicio": "10:00 AM",
              "fin": "12:50 PM"
            }
          ],
          "profesores": []
        }
      ]
    },
    {
      "id": "c62",
      "titulo": "INVESTIGACIÓN EN EDUCACIÓN POSGRADOS",
      "categoria": "posgrado",
      "tipo": "MS",
      "codigo": "EDUC-4047",
      "creditos": 4,
      "semanas": 16,
      "modalidad": "PRESENCIAL",
      "imagen": "media/course-62.webp",
      "descripcion": [
        "Brindar una panorámica histórica y filosófica de la configuración de la investigación educativa en relación con la práctica pedagógica. Dar a conocer los elementos y pasos o etapas más importantes de la práctica de la investigación para el mejoramiento de la educación y la pedagogía.Establecer las diferencias y características de los métodos cualitativos, cuantitativos y mixtos para le investigación en educación y pedagogía. Problematizar el alcance, las posibilidades y limitaciones de la investigación para el mejoramiento y la transformación de la práctica pedagógica."
      ],
      "obligatoriaEn": [
        "Maestría en Educación – Investigación (semipresencial)",
        "Doctorado en Educación"
      ],
      "electivaEn": [
        "Maestría en Educación – Profundización (semipresencial)",
        "Maestría en Educación – Profundización (virtual)",
        "Especialización en Innovación Curricular y Pedagógica",
        "Especialización en Liderazgo y Política Educativa"
      ],
      "secciones": [
        {
          "nrc": "83159",
          "horario": [
            {
              "dia": "LUNES",
              "inicio": "5:00 PM",
              "fin": "7:50 PM"
            }
          ],
          "profesores": []
        }
      ]
    },
    {
      "id": "c61",
      "titulo": "GESTIÓN Y LIDERAZGO DEL CAMBIO EDUCATIVO",
      "categoria": "posgrado",
      "tipo": "MS",
      "track": "compartido",
      "codigo": "EDUC-4062",
      "creditos": 4,
      "semanas": 16,
      "modalidad": "HÍBRIDA",
      "imagen": "media/course-61.webp",
      "descripcion": [
        "Este curso explora las teorías y prácticas contemporáneas en liderazgo educativo, con un enfoque en su aplicación en los contextos colombiano y latinoamericano. Los participantes explorarán diversas teorías de liderazgo en el ámbito educativo, tales como el liderazgo transformacional, liderazgo distribuido, liderazgo pedagógico, entre otras. A lo largo del programa, tendrán la oportunidad de examinar y desarrollar estrategias y prácticas clave para la gestión del cambio institucional, incluyendo:",
        "-Comprensión del contexto como elemento clave del cambio.",
        "-Construcción de una visión y metas colectivas.",
        "-Desarrollo profesional docente y fomento del liderazgo distribuido.",
        "-Diseño y gestión de proyectos de inclusión, equidad y mejora de la calidad educativa.",
        "-Fomento de una cultura colaborativa y de confianza relacional con docentes, familias y otros grupos de interés.",
        "-Comunicación para el cambio.",
        "-Evaluación del desempeño.",
        "El curso combina estudios de caso, ejercicios prácticos y trabajo colaborativo para asegurar que los participantes puedan aplicar lo aprendido directamente en sus contextos institucionales."
      ],
      "observaciones": "CONCENTRACIÓN EN LIDERAZGO Y POLÍTICA EDUCATIVA",
      "obligatoriaEn": [],
      "electivaEn": [
        "Todos los posgrados"
      ],
      "secciones": [
        {
          "nrc": "84193",
          "horario": [
            {
              "dia": "MIÉRCOLES",
              "inicio": "5:00 PM",
              "fin": "7:50 PM"
            }
          ],
          "profesores": [
            "p5"
          ]
        }
      ]
    },
    {
      "id": "c60",
      "titulo": "EDUCACIÓN, CONFLICTO Y PAZ",
      "categoria": "posgrado",
      "tipo": "MS",
      "codigo": "EDUC-4063",
      "creditos": 4,
      "semanas": 16,
      "modalidad": "VIRTUAL",
      "imagen": "media/course-60.webp",
      "descripcion": [
        "Este curso ofrece una mirada introductoria y crítica al campo de estudios sobre educación y conflicto armado, explorando la relación entre la violencia, los sistemas educativos y las oportunidades de construcción de paz. A partir del contexto colombiano y de debates internacionales, el curso examina: ¿Cómo se garantiza el derecho a la educación en contextos marcados por la violencia? y ¿Cómo la educación puede contribuir a la construcción de paz? El curso se estructura alrededor de los conceptos centrales del campo, el análisis de experiencias educativas en medio del conflicto y las posibilidades de una educación para la paz, con énfasis en los ejes de redistribución, reconocimiento, representación y reconciliación en el contexto colombiano actual"
      ],
      "observaciones": "CONCENTRACIÓN EN BIENESTAR, CONVIVENCIA Y JUSTICIA SOCIAL",
      "obligatoriaEn": [],
      "electivaEn": [
        "Todos los posgrados"
      ],
      "secciones": [
        {
          "nrc": "84466",
          "horario": [
            {
              "dia": "SÁBADO",
              "inicio": "7:00 AM",
              "fin": "9:50 AM"
            }
          ],
          "profesores": [
            "p25",
            "p26"
          ]
        }
      ]
    },
    {
      "id": "c59",
      "titulo": "PENSAMIENTO CRÍTICO EN EDUCACIÓN",
      "categoria": "posgrado",
      "tipo": "MS",
      "codigo": "EDUC-4102",
      "creditos": 4,
      "semanas": 16,
      "modalidad": "HÍBRIDA",
      "imagen": "media/course-59.webp",
      "descripcion": [
        "Objetivos del curso",
        "El curso busca generar una reflexión crítica acerca de lo que es y de lo que implica la búsqueda de la generación de pensamiento crítico por medio de la educación, y de la variedad de enfoques existentes y de las herramientas que proponen.  Asimismo, busca que los estudiantes construyan algunas herramientas propias que les ayuden a promover y/o estudiar la promoción de pensamiento crítico en pedagogía."
      ],
      "observaciones": "CONCENTRACIÓN EN INNOVACIÓN CURRICULAR Y PEDAGÓGICA",
      "obligatoriaEn": [],
      "electivaEn": [
        "Todos los posgrados"
      ],
      "secciones": [
        {
          "nrc": "84191",
          "horario": [
            {
              "dia": "MARTES",
              "inicio": "5:00 PM",
              "fin": "7:50 PM"
            }
          ],
          "profesores": [
            "p17"
          ]
        }
      ]
    },
    {
      "id": "c58",
      "titulo": "CALIDAD DE LAS INTERACCIONES EN LA PRIMERA INFANCIA",
      "categoria": "posgrado",
      "tipo": "MS",
      "track": "compartido",
      "codigo": "EDUC-4115",
      "creditos": 4,
      "semanas": 16,
      "modalidad": "PRESENCIAL",
      "imagen": "media/course-58.webp",
      "descripcion": [],
      "observaciones": "CONCENTRACIÓN EN DESARROLLO Y EDUCACIÓN INICIAL",
      "obligatoriaEn": [],
      "electivaEn": [
        "Todos los posgrados"
      ],
      "secciones": [
        {
          "nrc": "83279",
          "horario": [
            {
              "dia": "MARTES",
              "inicio": "5:00 PM",
              "fin": "7:50 PM"
            }
          ],
          "profesores": [
            "p11",
            "p6"
          ]
        }
      ]
    },
    {
      "id": "c57",
      "titulo": "TESIS 2",
      "categoria": "posgrado",
      "tipo": "MS",
      "codigo": "EDUC-4207",
      "creditos": 6,
      "semanas": 16,
      "modalidad": "VIRTUAL",
      "imagen": "media/course-57.webp",
      "descripcion": [],
      "prerrequisitos": "TESIS 1",
      "obligatoriaEn": [],
      "electivaEn": [],
      "secciones": [
        {
          "nrc": "82476",
          "horario": [],
          "profesores": []
        }
      ]
    },
    {
      "id": "c56",
      "titulo": "TRABAJO DE GRADO I",
      "categoria": "posgrado",
      "tipo": "MS",
      "track": "investigacion",
      "codigo": "EDUC-4208",
      "creditos": 2,
      "semanas": 16,
      "modalidad": "VIRTUAL",
      "imagen": "media/course-56.webp",
      "descripcion": [],
      "prerrequisitos": "CURRICULO Y PEDAGOGÍA",
      "obligatoriaEn": [
        "Maestría en Educación – Investigación (semipresencial)"
      ],
      "electivaEn": [],
      "secciones": [
        {
          "nrc": "81034",
          "horario": [],
          "profesores": [
            "p10"
          ]
        },
        {
          "nrc": "78405",
          "horario": [],
          "profesores": [
            "p6"
          ]
        },
        {
          "nrc": "78415",
          "horario": [],
          "profesores": [
            "p11"
          ]
        },
        {
          "nrc": "81034",
          "horario": [],
          "profesores": [
            "p10"
          ]
        },
        {
          "nrc": "81035",
          "horario": [],
          "profesores": [
            "p16"
          ]
        },
        {
          "nrc": "83905",
          "horario": [],
          "profesores": [
            "p12"
          ]
        },
        {
          "nrc": "83906",
          "horario": [],
          "profesores": []
        },
        {
          "nrc": "83907",
          "horario": [],
          "profesores": []
        },
        {
          "nrc": "83908",
          "horario": [],
          "profesores": [
            "p15"
          ]
        }
      ]
    },
    {
      "id": "c55",
      "titulo": "TRABAJO DE GRADO II",
      "categoria": "posgrado",
      "tipo": "MS",
      "track": "investigacion",
      "codigo": "EDUC-4209",
      "creditos": 4,
      "semanas": 16,
      "modalidad": "VIRTUAL",
      "imagen": "media/course-55.webp",
      "descripcion": [],
      "prerrequisitos": "TRABAJO DE GRADO I",
      "obligatoriaEn": [
        "Maestría en Educación – Investigación (semipresencial)"
      ],
      "electivaEn": [],
      "secciones": [
        {
          "nrc": "48786",
          "horario": [],
          "profesores": [
            "p18"
          ]
        },
        {
          "nrc": "63310",
          "horario": [],
          "profesores": [
            "p6"
          ]
        },
        {
          "nrc": "75150",
          "horario": [],
          "profesores": [
            "p17"
          ]
        },
        {
          "nrc": "78397",
          "horario": [],
          "profesores": [
            "p15"
          ]
        },
        {
          "nrc": "78399",
          "horario": [],
          "profesores": [
            "p10"
          ]
        },
        {
          "nrc": "78400",
          "horario": [],
          "profesores": [
            "p4"
          ]
        },
        {
          "nrc": "78416",
          "horario": [],
          "profesores": [
            "p7"
          ]
        },
        {
          "nrc": "81038",
          "horario": [],
          "profesores": [
            "p16"
          ]
        },
        {
          "nrc": "81040",
          "horario": [],
          "profesores": [
            "p3"
          ]
        },
        {
          "nrc": "81041",
          "horario": [],
          "profesores": [
            "p11"
          ]
        },
        {
          "nrc": "81042",
          "horario": [],
          "profesores": [
            "p12"
          ]
        }
      ]
    },
    {
      "id": "c36",
      "titulo": "PROYECTO INNOVACIÓN EDUCATIVA I",
      "categoria": "posgrado",
      "tipo": "MS",
      "track": "profundizacion",
      "codigo": "EDUC-4211",
      "creditos": 4,
      "semanas": 16,
      "modalidad": "VIRTUAL",
      "imagen": "media/course-36.webp",
      "descripcion": [],
      "prerrequisitos": "CURRÍCULO Y PEDAGOGÍA",
      "obligatoriaEn": [
        "Maestría en Educación – Profundización (semipresencial)",
        "Maestría en Educación – Profundización (virtual)"
      ],
      "electivaEn": [],
      "secciones": [
        {
          "nrc": "78608",
          "horario": [
            {
              "dia": "LUNES",
              "inicio": "5:00 PM",
              "fin": "7:50 PM"
            }
          ],
          "profesores": [
            "p10"
          ]
        }
      ]
    },
    {
      "id": "c35",
      "titulo": "PROYECTO INNOVACIÓN EDUCATIVA II",
      "categoria": "posgrado",
      "tipo": "MS",
      "track": "profundizacion",
      "codigo": "EDUC-4212",
      "creditos": 4,
      "semanas": 16,
      "modalidad": "VIRTUAL",
      "imagen": "media/course-35.webp",
      "descripcion": [],
      "prerrequisitos": "PROYECTO INNOVACIÓN EDUCATIVA I",
      "obligatoriaEn": [
        "Maestría en Educación – Profundización (semipresencial)",
        "Maestría en Educación – Profundización (virtual)"
      ],
      "electivaEn": [],
      "secciones": [
        {
          "nrc": "80458",
          "horario": [
            {
              "dia": "LUNES",
              "inicio": "5:00 PM",
              "fin": "7:50 PM"
            }
          ],
          "profesores": [
            "p10"
          ]
        }
      ]
    },
    {
      "id": "c34",
      "titulo": "INTERACCIONES EN EL AULA: OBSERVAR PARA TRANSFORMAR",
      "categoria": "posgrado",
      "tipo": "ESP",
      "codigo": "EDUC-5000",
      "creditos": 2,
      "semanas": 16,
      "modalidad": "VIRTUAL",
      "imagen": "media/course-34.webp",
      "descripcion": [
        "Este es un curso metodológico que brinda a las/los estudiantes la posibilidad de aprender herramientas útiles para enriquecer su comprensión sobre tipo de relaciones en el aula que favorecen o no los procesos formativos y de enseñanza-aprendizaje. El curso capacita a sus participantes en la identificación y caracterización de algunos aspectos clave de la práctica pedagógica. De esta capacitación se derivan algunas recomendaciones y aplicaciones para la práctica docente los/las participantes. Para esto, los y las estudiantes observan y analizan algunas interacciones en el aula del banco de experiencias de la Facultad de Educación."
      ],
      "observaciones": "PARA ESTUDIANTES DE LAS ESPECIALIZACIONES Y QUIENES SE ENCUENTRE EN DOBLE PROGRAMA CON LA MAESTRÍA",
      "obligatoriaEn": [],
      "electivaEn": [
        "Especialización en Liderazgo y Política Educativa",
        "Especialización en Innovación Curricular y Pedagógica"
      ],
      "secciones": [
        {
          "nrc": "83280",
          "horario": [
            {
              "dia": "JUEVES",
              "inicio": "5:00 PM",
              "fin": "7:50 PM"
            }
          ],
          "profesores": [
            "p2"
          ]
        }
      ]
    },
    {
      "id": "c33",
      "titulo": "EXPERIENCIA DE INVESTIGACIÓN",
      "categoria": "posgrado",
      "tipo": "DOC",
      "codigo": "EDUC-6002",
      "creditos": 6,
      "semanas": 16,
      "modalidad": "PRESENCIAL",
      "imagen": "media/course-33.webp",
      "descripcion": [],
      "obligatoriaEn": [
        "Doctorado en Educación"
      ],
      "electivaEn": [],
      "secciones": [
        {
          "nrc": "82477",
          "horario": [],
          "profesores": []
        }
      ]
    },
    {
      "id": "c32",
      "titulo": "ELABORACION DE PROPUESTA I",
      "categoria": "posgrado",
      "tipo": "DOC",
      "codigo": "EDUC-6006",
      "creditos": 6,
      "semanas": 16,
      "modalidad": "PRESENCIAL",
      "imagen": "media/course-32.webp",
      "descripcion": [],
      "obligatoriaEn": [
        "Doctorado en Educación"
      ],
      "electivaEn": [],
      "secciones": [
        {
          "nrc": "81206",
          "horario": [],
          "profesores": []
        },
        {
          "nrc": "81211",
          "horario": [],
          "profesores": []
        },
        {
          "nrc": "83909",
          "horario": [],
          "profesores": []
        },
        {
          "nrc": "83910",
          "horario": [],
          "profesores": []
        }
      ]
    },
    {
      "id": "c28",
      "titulo": "ELABORACIÓN DE PROPUESTA II",
      "categoria": "posgrado",
      "tipo": "DOC",
      "codigo": "EDUC-6012",
      "creditos": 6,
      "semanas": 16,
      "modalidad": "PRESENCIAL",
      "imagen": "media/course-28.webp",
      "descripcion": [],
      "observaciones": "2",
      "obligatoriaEn": [
        "Doctorado en Educación"
      ],
      "electivaEn": [],
      "secciones": [
        {
          "nrc": "78427",
          "horario": [],
          "profesores": []
        },
        {
          "nrc": "78430",
          "horario": [],
          "profesores": []
        },
        {
          "nrc": "83911",
          "horario": [],
          "profesores": []
        },
        {
          "nrc": "83912",
          "horario": [],
          "profesores": []
        },
        {
          "nrc": "83913",
          "horario": [],
          "profesores": []
        }
      ]
    },
    {
      "id": "c23",
      "titulo": "INVESTIGACION DOCTORAL EN CURSO",
      "categoria": "posgrado",
      "tipo": "DOC",
      "codigo": "EDUC-6031",
      "creditos": 4,
      "semanas": 16,
      "modalidad": "PRESENCIAL",
      "imagen": "media/course-23.webp",
      "descripcion": [],
      "prerrequisitos": "SOLO SE INSCRIBE CON APROBACIÓN DEL COMITÉ DE POSGRADOS.",
      "obligatoriaEn": [
        "Doctorado en Educación"
      ],
      "electivaEn": [],
      "secciones": [
        {
          "nrc": "82481",
          "horario": [],
          "profesores": []
        }
      ]
    },
    {
      "id": "c22",
      "titulo": "COLOQUIO DE INVESTIGACIÓN I",
      "categoria": "posgrado",
      "tipo": "DOC",
      "codigo": "EDUC-6040",
      "creditos": 1,
      "semanas": 16,
      "modalidad": "HÍBRIDA",
      "imagen": "media/course-22.webp",
      "descripcion": [],
      "observaciones": "5",
      "obligatoriaEn": [
        "Doctorado en Educación"
      ],
      "electivaEn": [],
      "secciones": [
        {
          "nrc": "53402",
          "horario": [
            {
              "dia": "VIERNES",
              "inicio": "5:00 PM",
              "fin": "7:50 PM"
            }
          ],
          "profesores": [
            "p15"
          ]
        }
      ]
    },
    {
      "id": "c21",
      "titulo": "COLOQUIO DE INVESTIGACIÓN II",
      "categoria": "posgrado",
      "tipo": "DOC",
      "codigo": "EDUC-6041",
      "creditos": 1,
      "semanas": 16,
      "modalidad": "HÍBRIDA",
      "imagen": "media/course-21.webp",
      "descripcion": [],
      "observaciones": "3",
      "obligatoriaEn": [
        "Doctorado en Educación"
      ],
      "electivaEn": [],
      "secciones": [
        {
          "nrc": "56710",
          "horario": [
            {
              "dia": "VIERNES",
              "inicio": "5:00 PM",
              "fin": "7:50 PM"
            }
          ],
          "profesores": [
            "p15"
          ]
        }
      ]
    },
    {
      "id": "c20",
      "titulo": "COLOQUIO DE INVESTIGACIÓN III",
      "categoria": "posgrado",
      "tipo": "DOC",
      "codigo": "EDUC-6042",
      "creditos": 1,
      "semanas": 16,
      "modalidad": "HÍBRIDA",
      "imagen": "media/course-20.webp",
      "descripcion": [],
      "observaciones": "5",
      "obligatoriaEn": [
        "Doctorado en Educación"
      ],
      "electivaEn": [],
      "secciones": [
        {
          "nrc": "78606",
          "horario": [
            {
              "dia": "VIERNES",
              "inicio": "5:00 PM",
              "fin": "7:50 PM"
            }
          ],
          "profesores": [
            "p15"
          ]
        }
      ]
    },
    {
      "id": "c19",
      "titulo": "COLOQUIO DE INVESTIGACIÓN IV",
      "categoria": "posgrado",
      "tipo": "DOC",
      "codigo": "EDUC-6043",
      "creditos": 1,
      "semanas": 16,
      "modalidad": "HÍBRIDA",
      "imagen": "media/course-19.webp",
      "descripcion": [],
      "observaciones": "3",
      "obligatoriaEn": [
        "Doctorado en Educación"
      ],
      "electivaEn": [],
      "secciones": [
        {
          "nrc": "66242",
          "horario": [
            {
              "dia": "VIERNES",
              "inicio": "5:00 PM",
              "fin": "7:50 PM"
            }
          ],
          "profesores": [
            "p15"
          ]
        }
      ]
    },
    {
      "id": "c18",
      "titulo": "COLOQUIO DE INVESTIGACIÓN V",
      "categoria": "posgrado",
      "tipo": "DOC",
      "codigo": "EDUC-6044",
      "creditos": 1,
      "semanas": 16,
      "modalidad": "HÍBRIDA",
      "imagen": "media/course-18.webp",
      "descripcion": [],
      "observaciones": "3",
      "obligatoriaEn": [
        "Doctorado en Educación"
      ],
      "electivaEn": [],
      "secciones": [
        {
          "nrc": "67511",
          "horario": [
            {
              "dia": "VIERNES",
              "inicio": "5:00 PM",
              "fin": "7:50 PM"
            }
          ],
          "profesores": [
            "p15"
          ]
        }
      ]
    },
    {
      "id": "c17",
      "titulo": "COLOQUIO DE INVESTIGACIÓN VI",
      "categoria": "posgrado",
      "tipo": "DOC",
      "codigo": "EDUC-6045",
      "creditos": 1,
      "semanas": 16,
      "modalidad": "HÍBRIDA",
      "imagen": "media/course-17.webp",
      "descripcion": [],
      "observaciones": "5",
      "obligatoriaEn": [
        "Doctorado en Educación"
      ],
      "electivaEn": [],
      "secciones": [
        {
          "nrc": "50203",
          "horario": [
            {
              "dia": "VIERNES",
              "inicio": "5:00 PM",
              "fin": "7:50 PM"
            }
          ],
          "profesores": [
            "p15"
          ]
        }
      ]
    },
    {
      "id": "c16",
      "titulo": "INVESTIGACIÓN DOCTORAL I",
      "categoria": "posgrado",
      "tipo": "DOC",
      "codigo": "EDUC-6050",
      "creditos": 10,
      "semanas": 16,
      "modalidad": "PRESENCIAL",
      "imagen": "media/course-16.webp",
      "descripcion": [],
      "prerrequisitos": "HABER APROBADO TODOS LOS CURSOS DE LOS CICLOS 1 Y 2. INGLÉS PARA DOCTORADO 2 APROBADO.",
      "obligatoriaEn": [
        "Doctorado en Educación"
      ],
      "electivaEn": [],
      "secciones": [
        {
          "nrc": "81214",
          "horario": [],
          "profesores": []
        },
        {
          "nrc": "81216",
          "horario": [],
          "profesores": []
        },
        {
          "nrc": "83915",
          "horario": [],
          "profesores": []
        },
        {
          "nrc": "83916",
          "horario": [],
          "profesores": []
        }
      ]
    },
    {
      "id": "c12",
      "titulo": "INVESTIGACIÓN DOCTORAL II",
      "categoria": "posgrado",
      "tipo": "DOC",
      "codigo": "EDUC-6051",
      "creditos": 10,
      "semanas": 16,
      "modalidad": "PRESENCIAL",
      "imagen": "media/course-12.webp",
      "descripcion": [],
      "observaciones": "2",
      "obligatoriaEn": [
        "Doctorado en Educación"
      ],
      "electivaEn": [],
      "secciones": [
        {
          "nrc": "78420",
          "horario": [],
          "profesores": []
        },
        {
          "nrc": "81220",
          "horario": [],
          "profesores": []
        },
        {
          "nrc": "81221",
          "horario": [],
          "profesores": []
        },
        {
          "nrc": "81224",
          "horario": [],
          "profesores": []
        }
      ]
    },
    {
      "id": "c8",
      "titulo": "PASANTÍA DOCTORAL",
      "categoria": "posgrado",
      "tipo": "DOC",
      "codigo": "EDUC-6060",
      "creditos": 10,
      "semanas": 16,
      "modalidad": "PRESENCIAL",
      "imagen": "media/course-8.webp",
      "descripcion": [],
      "prerrequisitos": "HABER APROBADO TODOS LOS CURSOS DE LOS CICLOS 1 Y 2. INGLÉS PARA DOCTORADO 2 APROBADO.",
      "obligatoriaEn": [
        "Doctorado en Educación"
      ],
      "electivaEn": [],
      "secciones": [
        {
          "nrc": "82482",
          "horario": [],
          "profesores": []
        }
      ]
    },
    {
      "id": "c7",
      "titulo": "EXAMEN COMPRENSIVO",
      "categoria": "posgrado",
      "tipo": "DOC",
      "codigo": "EDUC-6970",
      "creditos": 2,
      "semanas": 16,
      "modalidad": "PRESENCIAL",
      "imagen": "media/course-7.webp",
      "descripcion": [],
      "prerrequisitos": "PREPARACIÓN DEL EXAMEN COMPRENSIVO",
      "observaciones": "5",
      "obligatoriaEn": [
        "Doctorado en Educación"
      ],
      "electivaEn": [],
      "secciones": [
        {
          "nrc": "46894",
          "horario": [],
          "profesores": [
            "p1"
          ]
        }
      ]
    },
    {
      "id": "c6",
      "titulo": "PRUEBA CAPACIDAD INVESTIGATIVA",
      "categoria": "posgrado",
      "tipo": "DOC",
      "codigo": "EDUC-6971",
      "creditos": 0,
      "semanas": 16,
      "modalidad": "PRESENCIAL",
      "imagen": "media/course-6.webp",
      "descripcion": [],
      "correquisitos": "Elaboración de Propuesta 2 o Inscribir Por A Parte",
      "observaciones": "6",
      "obligatoriaEn": [
        "Doctorado en Educación"
      ],
      "electivaEn": [],
      "secciones": [
        {
          "nrc": "43707",
          "horario": [],
          "profesores": [
            "p1"
          ]
        }
      ]
    },
    {
      "id": "c5",
      "titulo": "PREPARACIÓN EXAMEN COMPRENSIVO",
      "categoria": "posgrado",
      "tipo": "DOC",
      "codigo": "EDUC-6972",
      "creditos": 2,
      "semanas": 16,
      "modalidad": "PRESENCIAL",
      "imagen": "media/course-5.webp",
      "descripcion": [],
      "prerrequisitos": "APROBADO INGLÉS PARA DOCTORADO 1.",
      "observaciones": "15",
      "obligatoriaEn": [
        "Doctorado en Educación"
      ],
      "electivaEn": [],
      "secciones": [
        {
          "nrc": "46270",
          "horario": [],
          "profesores": [
            "p1"
          ]
        }
      ]
    },
    {
      "id": "c4",
      "titulo": "SUSTENTACIÓN DE TESIS DOCTORAL",
      "categoria": "posgrado",
      "tipo": "DOC",
      "codigo": "EDUC-6990",
      "creditos": 0,
      "semanas": 16,
      "modalidad": "PRESENCIAL",
      "imagen": "media/course-4.webp",
      "descripcion": [],
      "prerrequisitos": "IMPORTANTE APROBAR ESTE NIVEL DE INGLÉS PARA GRADUARSE.",
      "correquisitos": "Inglés para Doctorado 3",
      "observaciones": "2",
      "obligatoriaEn": [],
      "electivaEn": [],
      "secciones": [
        {
          "nrc": "70244",
          "horario": [],
          "profesores": []
        },
        {
          "nrc": "81044",
          "horario": [],
          "profesores": []
        },
        {
          "nrc": "81226",
          "horario": [],
          "profesores": []
        },
        {
          "nrc": "83914",
          "horario": [],
          "profesores": []
        }
      ]
    }
  ],
  "profesores": [
    {
      "id": "p26",
      "nombre": "María José Bermeo",
      "cargo": "Profesora de cátedra",
      "bio": []
    },
    {
      "id": "p25",
      "nombre": "Gloria Naranjo",
      "cargo": "Profesora de cátedra ",
      "bio": []
    },
    {
      "id": "p20",
      "nombre": "Tatiana Moreno Angel",
      "cargo": "Profesora cátedra ",
      "bio": []
    },
    {
      "id": "p18",
      "nombre": "Isabel Tejada",
      "cargo": "Profesora Asociada",
      "imagen": "media/prof-18.webp",
      "bio": [
        "Áreas de interés investigativo: Adquisición de lenguas (segundas, adicionales) en contextos educativos. Interculturalidad y educación. Mentalidad de crecimiento (Growth Mindset). Currículo bilingüe y multilingüe. Pedagogía y didáctica de las lenguas. Análisis del discurso. Investigación acción y formación docente. Política Lingüística."
      ]
    },
    {
      "id": "p17",
      "nombre": "Jorge Andres Mejia Delgadillo",
      "cargo": "Profesor Asociado",
      "imagen": "media/prof-17.webp",
      "bio": [
        "Líneas de investigación: Filosofía de la educación, ciudadanía, pedagogías críticas, formación ciudadana y ética, pensamiento crítico en educación."
      ]
    },
    {
      "id": "p16",
      "nombre": "Hans Walter Cabra Hernandez",
      "cargo": "Profesor Asistente",
      "imagen": "media/prof-16.webp",
      "bio": []
    },
    {
      "id": "p15",
      "nombre": "Ana Maria Velasquez Niño",
      "cargo": "Profesora Titular",
      "imagen": "media/prof-15.webp",
      "bio": [
        "Profesora Titular y codirectora del grupo de investigación Educación para la primera infancia. Es Psicóloga de la Universidad de los Andes, obtuvo su doctorado en la Escuela de Educación de la Universidad de Pittsburgh (EE.UU.) y tiene una Maestría en Psicología y Educación y una especialización en Estudios Latinoamericanos de la misma institución.",
        "Su área de experticia está en la Educación Inicial. Tiene una larga experiencia documentando la calidad de las interacciones y es reconocida por su liderazgo en los procesos de evaluación y medición de la calidad de la educación inicial y el desarrollo infantil en Colombia y América Latina. Dirigió la medición nacional de la calidad de la educación inicial de Colombia y ha codirigido las evaluaciones de los programas de desarrollo profesional de aeioTU.",
        "A través de sus publicaciones y de proyectos financiados por entidades externas a la Universidad, ha contribuido al mejoramiento de la educación inicial en el país y al debate sobre la medición de la calidad de la educación inicial en la región. En la Universidad de los Andes se ha desempeñado como Vicedecana de la Facultad de Educación, Directora Académica de la Facultad de Ciencias Sociales y Directora de posgrados de Psicología."
      ]
    },
    {
      "id": "p14",
      "nombre": "Paula Bibiana Garcia Cardona",
      "cargo": "Profesora Asociada",
      "imagen": "media/prof-14.webp",
      "bio": [
        "Áreas de interés: Neurocognición, Neurociencias y Educación, Bilingüismo, Percepción del habla en condiciones acústicas adversas, Electroencefalografía – potenciales relacionados a eventos cognitivos."
      ]
    },
    {
      "id": "p13",
      "nombre": "Nataly Obando Rozo",
      "cargo": "Profesora Asistente",
      "imagen": "media/prof-13.png",
      "bio": [
        "Nataly Obando Rozo es economista, Máster en Economía, Máster en Educación y PhD en Psicología Educativa. Se graduó como economista de la Universidad Nacional, obtuvo su primer máster en Economía en la Universidad del Rosario, un segundo máster en Educación en la Universidad de La Rioja, y completó su doctorado, con una beca Fulbright, en Psicología Educativa en la Universidad de Illinois en Chicago.",
        "En sus inicios como economista estudió temas del mercado y pobreza; en los últimos años ha enfocado su trabajo en educación durante la adolescencia, desarrollo socioemocional y movilidad social."
      ]
    },
    {
      "id": "p12",
      "nombre": "Jose Dario Herrera Gonzalez",
      "cargo": "Profesor Asociado",
      "imagen": "media/prof-12.webp",
      "bio": [
        "Doctor en Filosofía de la Universidad Nacional de Colombia. Ha sido autor, entre otros, de Comanche, comandante del Cartucho (Premio Nacional de Historias de Vida); La comprensión de lo social; Pensar la educación, hacer investigación, y de más de una treintena de artículos en el campo de la educación y las ciencias sociales. Sus áreas de investigación son la hermenéutica, la pedagogía y las ciencias sociales."
      ]
    },
    {
      "id": "p11",
      "nombre": "Carolina Maldonado Carreño",
      "cargo": "Profesora Titular",
      "imagen": "media/prof-11.webp",
      "bio": []
    },
    {
      "id": "p10",
      "nombre": "Gary Alberto Cifuentes Alvarez",
      "cargo": "Profesor Asociado",
      "imagen": "media/prof-10.webp",
      "bio": [
        "Profesor asociado e investigador de la Facultad de Educación (Universidad de los Andes, Colombia) en la que ha trabajado por más de veinte (20) años. Es Doctor en Human Centered Communication and Informatics de la Universidad de Aalborg (Dinamarca).",
        "Dentro de sus libros más recientes se encuentran Lineamientos para investigar y evaluar innovaciones educativas (2018); Características individuales e institucionales que promueven la investigación y la innovación educativa en el Distrito Capital (2020); y Transformaciones que perduran: Orientaciones para garantizar la sostenibilidad de una innovación educativa (2024).",
        "Sus intereses académicos y de docencia giran alrededor de la innovación educativa y su liderazgo, la evaluación de los aprendizajes y la dimensión política de la innovación educativa. Fundamentado desde enfoques cualitativos y mixtos, especialmente desde enfoques como el policy enactment, los casos de estudios y la teoría de actor-red, su agenda examina la interconexión entre tecnologías, políticas y educación desde una perspectiva crítica."
      ]
    },
    {
      "id": "p9",
      "nombre": "Mariana Tafur",
      "cargo": "Profesora Asociada",
      "imagen": "media/prof-9.webp",
      "bio": [
        "Doctora en Educación en Ingeniería de la Universidad de Purdue, Indiana-USA; Magíster en Educación e Ingeniera Electrónica de la Universidad de los Andes, Bogotá-Colombia. Becaria Fulbright en 2010.",
        "Con más de 20 años de experiencia en educación en ciencia, tecnología, ingeniería y matemáticas (educación STEM) he participado en grupos de educación e investigación nacionales como Pequeños Científicos, Lidie, y Educación y evaluación en las disciplinas; así como en grupos internacionales como Inspire y Freeform Classroom.",
        "Mis intereses de investigación son: aproximación a retos tecnológicos en la cotidianidad, aprendizaje basado en colaboración, integración STEM desde primera infancia hasta la educación para toda la vida, desarrollo de habilidades de ingeniería, evaluación del aprendizaje y metodologías de investigación mixta, análisis de contenidos y fenomenografía."
      ]
    },
    {
      "id": "p8",
      "nombre": "Pedro Gómez",
      "cargo": "Profesor Visitante",
      "imagen": "media/prof-8.webp",
      "bio": [
        "Pedro Gómez es licenciado en Matemáticas e Ingeniero Industrial de la Universidad de los Andes; obtuvo un Master of Arts en Economía en The University of Kent at Canterbury, un Master of Science en Lógica y Método Científico en The London School of Economics, y un Diplome d'Etudes Approfondies en Sociología en la Universidad París III. Es doctor en Matemáticas (especialidad Didáctica de la Matemática) de la Universidad de Granada, España.",
        "Fue editor de la revista PNA durante 10 años. Actualmente es profesor de la Universidad de los Andes, director de \"una empresa docente\", director del proyecto Funes y director de la maestría en Educación Matemática. Pedro Gómez es autor de varios libros de texto de matemáticas y de didáctica de la matemática. Su trabajo gira alrededor de la formación de profesores de matemáticas."
      ]
    },
    {
      "id": "p7",
      "nombre": "Nancy Palacios Mena",
      "cargo": "Profesora Asociada",
      "imagen": "media/prof-7.webp",
      "bio": [
        "Nancy Palacios Mena hace parte del grupo de investigación de Políticas Educativas y Vida Escolar. Sus áreas de interés son: La enseñanza y el aprendizaje de las ciencias sociales en primaria y secundaria, el desarrollo de competencias en la educación básica, la relación entre prácticas pedagógicas y aprendizaje, las prácticas pedagógicas etnoeducativas, y la formación de maestros. Actualmente es la directora de Licenciaturas."
      ]
    },
    {
      "id": "p6",
      "nombre": "Eduardo Escallon Largacha",
      "cargo": "Profesor Asociado",
      "imagen": "media/prof-6.webp",
      "bio": [
        "Eduardo Escallón es Profesor Asociado y codirector del grupo de investigación Educación para la primera infancia. Historiador y doctor en Literaturas y Lenguas Romances. Fundó y dirigió el Centro de Español de la Universidad de los Andes, dirigió el Centro de Investigación y Formación en Educación – CIFE – y lideró la creación de la Facultad de Educación.",
        "Como primer Decano dirigió la creación y puesta en marcha de las nueve Licenciaturas que ofrece la Facultad, de la Escuela de Posgrados, y del Centro de Evaluación y se enfocó en dignificar la profesión docente en Colombia. Es autor de varios artículos académicos relacionados con currículo y pedagogía y como escritor ha publicado varias obras.",
        "Tiene una amplia experiencia en la implementación de proyectos participativos para promover la educación ciudadana en entornos rurales y urbanos. Ha sido coinvestigador en las evaluaciones de los programas de desarrollo profesional de aeioTU y lideró el componente pedagógico de la Medición nacional de la calidad de la educación inicial en Colombia. Recientemente lideró el diseño e implementación del proceso de formación Evaluar para Avanzar que benefició a 2,400 docentes de educación inicial en Colombia."
      ]
    },
    {
      "id": "p5",
      "nombre": "Jorge Grant Baxter",
      "cargo": "Profesor Asociado",
      "imagen": "media/prof-5.webp",
      "bio": [
        "Áreas de interés: Educación, Análisis de políticas públicas en educación, Gobernabilidad y reformas educativas, Participación social en educación, Cooperación internacional en educación, Educación y desarrollo, Educación y democracia, Comunicación y salud, Cine y educación."
      ]
    },
    {
      "id": "p4",
      "nombre": "Julian Patricio Mariño Von Hildebrand",
      "cargo": "Profesor Asociado",
      "bio": [
        "Obtuvo su doctorado en Liderazgo Educativo y Estudios de Política con una beca Fulbright en la Universidad de Vermont (UVM), además es magíster en Gobierno de la Universidad de los Andes, y politólogo y egresado del programa de Francés de Middlebury College (Vermont), de donde se graduó con honores cum laude.",
        "Inspirado por el análisis de la pobreza y la desigualdad social, ha enfocado su investigación en cómo el acceso a bienes básicos —como una lavadora, un computador o internet— puede mejorar el rendimiento académico y la calidad de vida de niñas, niños y jóvenes en Colombia."
      ]
    },
    {
      "id": "p3",
      "nombre": "Nicolas Juan Camilo Aguilar Forero",
      "cargo": "Profesor Asociado",
      "bio": []
    },
    {
      "id": "p2",
      "nombre": "Andrea Del Pilar Solano Vargas",
      "cargo": "Profesora cátedra ",
      "bio": []
    },
    {
      "id": "p1",
      "nombre": "Edwin Giovanni Ussa Valderrama",
      "cargo": "Profesor de Cátedra",
      "bio": []
    }
  ]
};
