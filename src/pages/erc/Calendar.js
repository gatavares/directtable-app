import React, { useContext, useState, useEffect } from 'react'
import { ColorModeContext, tokens } from '../../theme';
import { useTheme } from '@mui/material/styles';
import { Divider, Grid, Box, Card, CardContent, Typography, Button, Modal, TextField, Autocomplete, Link, Checkbox, FormGroup, FormControlLabel } from '@mui/material';
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import resourceTimelinePlugin from '@fullcalendar/resource-timeline'
// import { EVENTS, createEventId } from './events'
import './Calendar.css';

import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../pages/auth/firebase/firebase";
import axios from "axios";
import { ProgressIndicator } from '../../components/ProgressIndicator';

const SALAS = [
  { id: '0A', title: '0A', },
  { id: '0B', title: '0B', },
  { id: '1A', title: '1A', },
  { id: '1B', title: '1B', },
  { id: '1C', title: '1C', },
  { id: '1D', title: '1D', },
  { id: '2A', title: '2A', },
  { id: '2B', title: '2B', },
  { id: '2C', title: '2C', },
  { id: '2D', title: '2D', },
  { id: '2E', title: '2E', },
  { id: '3A', title: '3A', },
  { id: '3B', title: '3B', },
  { id: 'P2A', title: 'P2A', },
  { id: 'P2B', title: 'P2B', },
  { id: 'P2C', title: 'P2C', },
  { id: 'PV', title: 'PV', },
  // { id: 'CANCELADO', title: 'CANC.', },
]

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '70%',
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
};

var initialTimeZone = 'Europe/Lisbon';

export default function Calendar() {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const ColorMode = useContext(ColorModeContext);
  const [currentEvents, setCurrentEvents] = useState([])

  const [loaded, setLoaded] = useState(false);
  const [aulasData, setAulasData] = useState([]);
  const [disciplinasData, setDisciplinasData] = useState([]);

  let data = []
  let loadedTurmas = [false, false, false, false, false, false, false, false]
  let disciplinas = []

  let eventGuid = 0;
  let todayStr = new Date().toISOString().replace(/T.*$/, '') // YYYY-MM-DD of today
  function createEventId() {
    return String(eventGuid++);
  }


  const [authUser, setAuthUser] = useState(null);
  let userCache = false
  useEffect(() => {
    const listen = onAuthStateChanged(auth, (user) => {
      if (user) {
        setAuthUser(user);
        console.log(user.uid);
        userTypeCalc(user.uid, user.email);

      } else {
        userCache = false;
        setAuthUser(null);
      }
    });

    return () => {
      listen();
    };
  }, []);

  const [userType, setUserType] = useState(0); //0 aluno, 1 professor, 2 secretaria, 3 direcao, 4 admin 

  function userTypeCalc(uid, email) {
    let type = false //true aluno / false professor, secretaria ou direcao
    console.log(uid)
    console.log(email)

    function checkFirstLetterNumber(_string) {
      return /^\d/.test(_string);
    }

    function checkFirstLetterNumber(_string) {
      return /^\d/.test(_string);
    }

    type = checkFirstLetterNumber(email)

    let verificao = '';
    let subverificao = '';
    if (type == false) {
      if (email.includes('admin')) {
        verificao = 'admin';
        setUserType(4);
      }
      else if (email.includes('@professores.ruizcosta.edu.pt')) {
        verificao = 'professor';
        setUserType(1);
      }
      else if (email.includes('@ruizcosta.edu.pt')) {
        verificao = 'direcao'
        setUserType(3);
        if (email.includes('margarida.leite')) {
          subverificao = 'secretaria';
          setUserType(2);
        }
        else {
          subverificao = 'direcao';
          setUserType(3);
        }
      }
    }
    console.log(verificao)
  }

  useEffect(() => {
    axios({
      method: "get",
      url: `https://directtable-s.onrender.com/carregar/turmas`,
    }).then((response) => {
      response.data.forEach(element => {
        data.push({
          id: createEventId(),
          title: element.turma,
          description: element.disciplina == '.' ? 'AULA CANCELADA' : 'Disciplina: ' + element.disciplina,
          disciplinaAntiga: element.disciplinaAntiga,
          start: todayStr + 'T' + element.dataStart,
          dataInicio: element.dataStart,
          dataFim: element.dataEnd,
          end: todayStr + 'T' + element.dataEnd,
          allday: false,
          resourceId: element.sala,
          salaAntiga: element.salaAntiga,
          professor: element.professor,
          alterado: element.alterado,
          color: theme.palette.mode ? element.alterado == 1 ? colors.salaHorario[500] : element.alterado == 2 ? colors.disciplinaHorario[500] : element.alterado == 3 ? colors.canceladoHorario[500] : colors.icons[500] : element.alterado == 1 ? colors.salaHorario[500] : element.alterado == 2 ? colors.disciplinaHorario[500] : element.alterado == 3 ? colors.canceladoHorario[500] : colors.icons[500],
          textColor: theme.palette.mode ? element.alterado == 0 ? '#000' : element.alterado == 1 ? '#000' : element.alterado == 2 ? '#000' : element.alterado == 3 ? '#FFFF' : '#000' : element.alterado == 0 ? '#000' : element.alterado == 1 ? '#000' : element.alterado == 2 ? '#000' : element.alterado == 3 ? '#FFFF' : '#000',
        })
      });
      setAulasData(data);
      console.log(data)
      setLoaded(true);
      if (loaded) {
        console.log(aulasData);
        console.log(disciplinasData[0]);
      }
    }).catch(alert);

    axios({
      method: "get",
      url: `https://directtable-s.onrender.com/carregar/escola`,
    }).then((response) => {
      response.data.forEach(element => {
        disciplinas.push({
          disciplinas: element.disciplinas,
        })
      });
      setDisciplinasData(disciplinas);
    }).catch(alert);
  }, [])



  const handleDateSelect = (selectInfo) => { //criar evento com arrastar
    console.log(selectInfo.resource.id)
    console.log(selectInfo.startStr)
    console.log(selectInfo.endStr)
    console.log(selectInfo.allDay) //variaveis de seleção
    setNewAula([selectInfo.resource.id, selectInfo.startStr, selectInfo.endStr, selectInfo.allDay]);
    handleOpenNew();
  }

  const handleEventClick = (clickInfo) => { //apagar evento
    // if (window.confirm(`Tens a certeza que queres apagar esta aula: '${clickInfo.event.title}'`)) {
    //   clickInfo.event.remove()
    // }
    console.log(clickInfo.event.id);
    handleOpen(clickInfo.event.id);
  }


  const handleEvents = (events) => {
    setCurrentEvents(events);
  }

  function updateAula(id, dataInicio, dataFim, turma, disciplina, disciplinaAntiga, sala, salaAntiga, professor, alterado, verificacaoAlterado) {
    //tranformar str para int dependendo da alteração e corrigir potenciais erros
    if (alterado == 'Normal') {
      if (sala == salaAntiga) {
        salaAntiga = ' ';
      }
      if (disciplina == disciplinaAntiga) {
        disciplinaAntiga = ' ';
      }
      alterado = 0
    }
    else if (alterado == 'Trocar Sala') {
      if (sala == salaAntiga) {
        salaAntiga = ' ';
      }
      if (disciplina == disciplinaAntiga) {
        disciplinaAntiga = ' ';
      }
      alterado = 1
    }
    else if (alterado == 'Trocar Disciplina') {
      if (sala == salaAntiga) {
        salaAntiga = ' ';
      }
      if (disciplina == disciplinaAntiga) {
        disciplinaAntiga = ' ';
      }
      alterado = 2
    }
    else if (alterado == 'Cancelar Aula') {
      if (sala == salaAntiga) {
        salaAntiga = ' ';
      }
      if (disciplina == disciplinaAntiga) {
        disciplinaAntiga = ' ';
      }
      alterado = 3;
      disciplina = ' ';
      disciplinaAntiga = ' ';
      salaAntiga = ' ';
    }
    else {
      alterado = 4
    }


    //se nao trocar o tipo de alteração mas trocar alguns campos
    if (!verificacaoAlterado) {
      if (disciplinaAntiga != ' ' || salaAntiga != ' ') {
        if (salaAntiga != '') {
          //fazer so se for diferente do valor anteriormente passado 
          if (salaAntiga != aulasData[id].salaAntiga) {
            alterado = 1
          }
        }
        else if (disciplinaAntiga != '') {
          if (disciplinaAntiga != aulasData[id].disciplinaAntiga) {
            alterado = 2
          }
        }
      }
    }

    //depois dos processos, realizar verificação de campos vazios
    if (salaAntiga == '') {
      salaAntiga = ' '
    }
    if (disciplina == '') {
      disciplina = ' '
    }
    if (disciplinaAntiga == '') {
      disciplinaAntiga = ' '
    }

    console.log(
      {
        'data Inicio': dataInicio,
        'data Fim': dataFim,
        'turma': turma,
        'disciplina': disciplina,
        'disciplina Antiga': disciplinaAntiga,
        'sala': sala,
        'sala Antiga': salaAntiga,
        'professor': professor,
        'alterado': alterado,
      }
    )

    //mandar para a firebase
    axios({
      method: "get",
      url: `https://directtable-s.onrender.com/alterar/${dataInicio}/${dataFim}/${turma}/${disciplina}/${disciplinaAntiga}/${sala}/${salaAntiga}/${professor}/${alterado}/`,
    }).then((response) => {
      if (response.data['saved']) {
        window.location.reload();
      }
    }).catch((error) => {
      if (error.response.status === 404) {
        alert('Erro a guardar alterações.\nErro: FALTA DE DADOS')
      }
    });
  }

  function ChildModal() {
    const [open, setOpen] = useState(false);
    const handleOpen = () => {
      setOpen(true);
    };
    const handleClose = () => {
      setOpen(false);
    };


    const optionsAlterado = ['Normal', 'Trocar Sala', 'Trocar Disciplina', 'Cancelar Aula'];
    const optionsSala = ['SEM SALA', '0A', '0B', '1A', '1B', '1C', '1D', '2A', '2B', '2C', '2D', '2E', '3A', '3B', 'P2A', 'P2B', 'P2C', 'PV'];
    const optionsHoraInicio = ['08:30:00', '09:45:00', '10:55:00', '12:00:00', '13:25:00', '14:30:00', '15:40:00', '16:45:00'];
    const optionsHoraFim = ['09:30:00', '10:45:00', '11:55:00', '13:00:00', '14:25:00', '15:30:00', '16:40:00', '17:45:00'];
    const optionsDisciplina = disciplinasData[0].disciplinas;
    const optionsProfessor = ['10074', '10032', '10089', '10013', '10067', '10061', '10045'];
    const optionsTurma = ['1º GPSI', '2º GPSI', '3º GPSI', '1º TM', '2º TM', '3º TM', '1º TEAC', '2º TEAC', '3º TEAC', '1º GEI', '2º GEI', '3º GEI', '1º TD3D', '2º TD3D', '3º TD3D', 'CEF',];

    const [valueTurma, setValueTurma] = useState(openNew ? '' : aulasData[infoClick].title);
    const [valueAlterado, setValueAlterado] = useState(openNew ? optionsAlterado[0] : optionsAlterado[aulasData[infoClick].alterado]);
    const [valueVerificacaoAlterado, setValueVerificacaoAlterado] = useState(false);
    const [valueSala, setValueSala] = useState(openNew ? newAula[0] : aulasData[infoClick].resourceId);
    const [valueSalaAntiga, setValueSalaAntiga] = useState(openNew ? '' : aulasData[infoClick].salaAntiga);
    const [valueHoraInicio, setValueHoraInicio] = useState(openNew ? newAula[1].slice(+11) : aulasData[infoClick].dataInicio);
    const [valueHoraFim, setValueHoraFim] = useState(openNew ? newAula[2].slice(+11) : aulasData[infoClick].dataFim);
    const [valueDisciplina, setValueDisciplina] = useState(openNew ? '' : aulasData[infoClick].alterado == 3 ? aulasData[infoClick].description : aulasData[infoClick].description.slice(aulasData[infoClick].description.indexOf(': ') + 2));
    const [valueDisciplinaAntiga, setValueDisciplinaAntiga] = useState(openNew ? '' : aulasData[infoClick].disciplinaAntiga);
    const [valueProfessor, setValueProfessor] = useState(openNew ? '' : aulasData[infoClick].professor);

    const [inputValueAlterado, setInputValueAlterado] = useState('');
    const [inputValueSala, setInputValueSala] = useState('');
    const [inputValueHoraInicio, setInputValueHoraInicio] = useState('');
    const [inputValueHoraFim, setInputValueHoraFim] = useState('');
    const [inputValueDisciplina, setInputValueDisciplina] = useState('');
    const [inputValueProfessor, setInputValueProfessor] = useState('');
    const [inputValueTurma, setInputValueTurma] = useState('');

    return (
      <React.Fragment>
        <Button onClick={handleOpen}>Editar Informações</Button>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="child-modal-title"
          aria-describedby="child-modal-description"
        >
          <form>
            <Box sx={{ ...style, width: '70%', textAlign: 'center' }}>
              {openNew ? <h2 id="parent-modal-title" sx={{ display: 'flex' }}>CRIAR <b>NOVA AULA</b></h2> : <h2 id="parent-modal-title" sx={{ display: 'flex' }}>INFORMAÇÕES DE <b>{aulasData[infoClick].title}</b></h2>}
              <p id="parent-modal-description">
                <Box sx={{ marginBottom: '20px', display: 'flex', alignContent: 'center', justifyContent: 'center' }}>
                  <div sx={{ display: 'flex', alignContent: 'center', justifyContent: 'center' }}>
                    <Box sx={{ display: 'flex', marginBottom: '20px', textAlign: 'center', alignContent: 'center', justifyContent: 'center' }}>
                      <Autocomplete
                        value={valueAlterado}
                        onChange={(event, newValue) => {
                          setValueAlterado(newValue);
                          if (newValue == optionsAlterado[3]) {
                            setValueSala('CANCELADO');
                            setValueDisciplina('');
                            setValueDisciplinaAntiga('');
                            setValueSalaAntiga('');
                          }
                          if (newValue == optionsAlterado[2]) {

                          }
                          if (newValue == optionsAlterado[1]) {
                            setValueSalaAntiga(aulasData[infoClick].resourceId);
                          }
                          if (newValue == optionsAlterado[0] && newValue != optionsAlterado[aulasData[infoClick].alterado]) {
                            setValueDisciplina('');
                            setValueDisciplinaAntiga('');
                            setValueSalaAntiga('');
                            setValueSala('');
                            setValueVerificacaoAlterado(true);
                          }
                        }}
                        inputValue={inputValueAlterado}
                        onInputChange={(event, newInputValue) => {
                          setInputValueAlterado(newInputValue);
                          if (newInputValue == optionsAlterado[3]) {
                            setValueSala('AULA CANCELADA');
                          }
                          if (newInputValue == optionsAlterado[2]) {

                          }
                          if (newInputValue == optionsAlterado[1]) {
                            setValueSalaAntiga(valueSala);
                          }
                        }}
                        id="controllable-states-demo"
                        options={optionsAlterado}
                        sx={{
                          width: 180,
                          marginRight: '40px',
                        }}
                        renderInput={(params) => <TextField {...params} label="Alteração" variant='standard' />}

                      />
                    </Box>
                    <Box sx={{ display: 'flex', marginBottom: '20px', alignContent: 'center', justifyContent: 'center' }}>
                      <Autocomplete
                        value={valueHoraInicio}
                        onChange={(event, newValue) => {
                          setValueHoraInicio(newValue);
                        }}
                        inputValue={inputValueHoraInicio}
                        onInputChange={(event, newInputValue) => {
                          setInputValueHoraInicio(newInputValue);
                        }}
                        id="controllable-states-demo"
                        options={optionsHoraInicio}
                        sx={{
                          width: 140,
                          marginRight: '40px',
                        }}
                        renderInput={(params) => <TextField {...params} label="Início" variant='standard' />}

                      />
                      <Autocomplete
                        value={valueHoraFim}
                        onChange={(event, newValue) => {
                          setValueHoraFim(newValue);
                        }}
                        inputValue={inputValueHoraFim}
                        onInputChange={(event, newInputValue) => {
                          setInputValueHoraFim(newInputValue);
                        }}
                        id="controllable-states-demo"
                        options={optionsHoraFim}
                        sx={{
                          width: 140,
                          marginRight: '40px',
                        }}
                        renderInput={(params) => <TextField {...params} label="Fim" variant='standard' />}

                      />
                      {openNew ?
                        <Autocomplete
                          value={valueTurma}
                          onChange={(event, newValue) => {
                            setValueTurma(newValue);
                          }}
                          inputValue={inputValueTurma}
                          onInputChange={(event, newInputValue) => {
                            setInputValueTurma(newInputValue);
                          }}
                          id="controllable-states-demo"
                          options={optionsTurma}
                          sx={{
                            width: 140,
                            marginRight: '40px',
                          }}
                          renderInput={(params) => <TextField {...params} label="Turma" variant='standard' />}

                        />
                        :
                        []
                      }

                    </Box>
                    <Box sx={{ display: 'flex', marginBottom: '20px', alignContent: 'center', justifyContent: 'center' }}>
                      <Autocomplete
                        value={valueSala}
                        onChange={(event, newValue) => {
                          setValueSala(newValue);
                          if (newValue != valueSala) {
                            setValueSalaAntiga(valueSala);
                          }
                          else {
                            setValueSalaAntiga('');
                          }
                        }}
                        inputValue={inputValueSala}
                        onInputChange={(event, newInputValue) => {
                          setInputValueSala(newInputValue);
                          if (newInputValue != valueSala) {
                            setValueSalaAntiga(valueSala);
                          }
                          else {
                            setValueSalaAntiga('');
                          }
                        }}
                        id="controllable-states-demo"
                        options={optionsSala}
                        sx={{
                          width: 180,
                          marginRight: '40px',
                        }}
                        renderInput={(params) => <TextField {...params} label="Sala" variant='standard' />}

                      />
                      <Autocomplete
                        value={valueDisciplina}
                        onChange={(event, newValue) => {
                          setValueDisciplina(newValue);
                          if (newValue != valueDisciplina) {
                            setValueDisciplinaAntiga(valueDisciplina);
                          }
                          else {
                            setValueDisciplinaAntiga('');
                          }
                        }}
                        inputValue={inputValueDisciplina}
                        onInputChange={(event, newInputValue) => {
                          setInputValueDisciplina(newInputValue);
                          if (newInputValue != valueDisciplina) {
                            setValueDisciplinaAntiga(valueDisciplina);
                          }
                          else {
                            setValueDisciplinaAntiga('');
                          }
                        }}
                        id="controllable-states-demo"
                        options={optionsDisciplina}
                        sx={{
                          width: 180,
                          marginRight: '40px',
                        }}
                        renderInput={(params) => <TextField {...params} label="Disciplina" variant='standard' />}

                      />
                      <Autocomplete
                        value={valueProfessor}
                        onChange={(event, newValue) => {
                          setValueProfessor(newValue);
                        }}
                        inputValue={inputValueProfessor}
                        onInputChange={(event, newInputValue) => {
                          setInputValueProfessor(newInputValue);
                        }}
                        id="controllable-states-demo"
                        options={optionsProfessor}
                        sx={{
                          alignContent: 'center', justifyContent: 'center',
                          width: 140,
                          marginRight: '40px',
                        }}
                        renderInput={(params) => <TextField {...params} label="Professor" variant='standard' />}

                      />
                    </Box>
                  </div>
                </Box>
                <Button onClick={() => updateAula(infoClick, valueHoraInicio, valueHoraFim, valueTurma, valueDisciplina, valueDisciplinaAntiga, valueSala, valueSalaAntiga, valueProfessor, valueAlterado, valueVerificacaoAlterado)}>Confirmar Alterações</Button>
              </p>
            </Box>
          </form>
        </Modal >
      </React.Fragment >
    );
  }

  const [open, setOpen] = useState(false);
  const [openNew, setOpenNew] = useState(false);
  const [infoClick, setInfoClick] = useState(false);
  const [newAula, setNewAula] = useState(['', '', '', false]);
  const handleOpen = (info) => {
    setOpen(true);
    setInfoClick(info);
  };
  const handleClose = () => {
    setOpen(false);
    setOpenNew(false);
  };



  const handleOpenNew = () => {
    setOpenNew(true);
    setOpen(true);
    setInfoClick(99999);
  };

  const ptLocale = {
    code: "pt",
    buttonText: {
      today: "Hoje",
    },
    titleFormat: { weekday: 'short', omitCommas: true }
  }


  const [openSala, setOpenSala] = useState(false);

  const handleCloseSala = () => {
    setOpenSala(false);
  };


  const [inputValueSala, setInputValueSala] = useState('');
  const [inputValueHoraInicio, setInputValueHoraInicio] = useState('');
  const [inputValueTurma, setInputValueTurma] = useState('');

  const [valueTurma, setValueTurma] = useState('');
  const [valueSala, setValueSala] = useState('');
  const [valueHoraInicio, setValueHoraInicio] = useState('');
  const [grupoChecked, setGrupoChecked] = React.useState(false);

  const handleCheckChange = (event) => {
    setGrupoChecked(event.target.checked);
  };

  if (userType >= 2) {
    if (loaded) {
      return (
        <div className='demo-app'>
          <div className='demo-app-main'>
            <ProgressIndicator open={loaded} />
            <FullCalendar
              schedulerLicenseKey='CC-Attribution-NonCommercial-NoDerivatives'
              timeZone={initialTimeZone}
              locales={[ptLocale]}
              locale='pt'
              eventMinWidth='100px'
              slotDuration='01:00'
              slotLabelInterval='00:30'
              slotMinTime='08:30'
              slotMaxTime='17:45'
              weekends={true} //trocar pra false ao tranformar data para sacar so os dias da semana todos
              nowIndicator={true}
              // now='2022-12-20 10:00:00'
              // nowIndicatorContent =  {{ html:` <p>${hourIndicator}</p>`}}
              plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin, resourceTimelinePlugin]}
              headerToolbar={{
                left: 'prev,next today',
                //left: '',
                center: '',
                // right: 'timeGridWeek,resourceTimelineDay'
                right: ''
              }}
              initialView='resourceTimelineDay'
              editable={false} //desativar
              selectable={true}
              selectMirror={true}
              dayMaxEvents={true}
              initialEvents={aulasData} // alternatively, use the `events` setting to fetch from a feed
              displayEventTime={true}
              resources={SALAS}
              resourceAreaHeaderContent=' '
              resourceAreaWidth='80px'
              select={handleDateSelect}
              eventContent={renderEventContent} // custom render function
              eventClick={handleEventClick}
              eventsSet={handleEvents} // called after events are initialized/added/changed/removed
            />
          </div>
          <div className='cancelado'>
            <div className="alteracoes">
              <Box height={60} />
              <Divider sx={{ borderBottomWidth: '2px' }} />

              <Box sx={{ display: 'flex', marginBottom: '5px', color: colors.texto[500] }}>
                <Typography sx={{ fontSize: '20px', fontWeight: 'bold', marginTop: '10px' }}>
                  Aulas Canceladas
                </Typography>
              </Box>
              <Box>
                <Grid container >
                  {aulasData.map(({ id, start, end, dataInicio, dataFim, title, description, disciplinaAntiga, resourceId, salaAntiga, professor, alterado }, index) => {
                    if (alterado == 3) {
                      return (
                        <Grid item xs={12} sm={12} md={12} lg={2} sx={{ marginRight: '30px', marginBottom: '30px' }}>
                          <Card key={title} elevation={5} sx={{
                            display: 'flex', justifyContent: 'center', textAlign: 'center',
                            minWidth: 180, width: '100%',
                            backgroundColor: alterado == 0 ? colors.fundo[400] : alterado == 1 ? colors.sala[500] : alterado == 2 ? colors.disciplina[500] : colors.cancelado[500],
                            color: colors.texto[500],
                            border: '1px solid', borderColor: colors.texto[500], borderRadius: '10px',
                            cursor: 'pointer',
                            //fazer hover e active e focuos 
                            '.css-46bh2p-MuiCardContent-root': {
                              paddingTop: '-14px',
                            },
                            '.css-46bh2p-MuiCardContent-root:last-child': {
                              paddingBottom: '10px',
                            },
                          }} onClick={() => {
                            handleOpen(index);
                          }}>
                            <CardContent>
                              <Typography sx={{ fontSize: '1.3rem', fontWeight: 'bold', }} component="div" >
                                {title}
                              </Typography>
                              <Typography sx={{ mt: 1 }}>
                              </Typography>
                              <Typography sx={{ fontSize: '1.2rem' }}>
                                {description}
                              </Typography>
                            </CardContent>
                          </Card>
                          {open ?
                            !openNew ?
                              <div>
                                <Modal
                                  open={open}
                                  onClose={handleClose}
                                  aria-labelledby="parent-modal-title"
                                  aria-describedby="parent-modal-description"
                                >
                                  <Box sx={{ ...style, width: '70%', textAlign: 'center' }}>
                                    <h2 id="parent-modal-title">INFORMAÇÕES DE <b>{aulasData[infoClick].title}</b></h2>
                                    <p id="parent-modal-description">
                                      <Box sx={{ marginBottom: '20px', textAlign: 'center', paddingLeft: '70px' }}>
                                        <div sx={{ display: 'flex', }}>
                                          <TextField
                                            id="standard-read-only-input"
                                            label="Início"
                                            defaultValue={aulasData[infoClick].dataInicio}
                                            InputProps={{
                                              readOnly: true,
                                            }}
                                            sx={{
                                              width: 65,
                                              marginRight: '40px',
                                            }}
                                            variant='standard'
                                          />
                                          <TextField
                                            id="standard-read-only-input"
                                            label="Fim"
                                            defaultValue={aulasData[infoClick].dataFim}
                                            InputProps={{
                                              readOnly: true,
                                            }}
                                            sx={{
                                              width: 65,
                                              marginRight: '40px',
                                            }}
                                            variant='standard'
                                          />
                                          <TextField
                                            id="standard-read-only-input"
                                            label="Disciplina"
                                            defaultValue={aulasData[infoClick].alterado == 3 ? aulasData[infoClick].description : aulasData[infoClick].description.slice(aulasData[infoClick].description.indexOf(': ') + 2)}
                                            InputProps={{
                                              readOnly: true,
                                            }}
                                            variant='standard'
                                            sx={{
                                              width: 160,
                                              marginRight: '40px',
                                            }}
                                          />
                                          <TextField
                                            id="standard-read-only-input"
                                            label="Disciplina Antiga"
                                            defaultValue={aulasData[infoClick].disciplinaAntiga}
                                            InputProps={{
                                              readOnly: true,
                                            }}
                                            sx={{
                                              width: 160,
                                              marginRight: '40px',
                                            }}
                                            variant='standard'
                                          />
                                        </div>
                                      </Box>
                                      <Box sx={{ marginBottom: '20px', paddingLeft: 10 }}>
                                        <div sx={{ display: 'flex', }}>
                                          <TextField
                                            id="standard-read-only-input"
                                            label="Sala"
                                            defaultValue={aulasData[infoClick].resourceId}
                                            InputProps={{
                                              readOnly: true,
                                            }}
                                            sx={{
                                              width: 150,
                                              marginRight: '40px',
                                            }}
                                            variant='standard'
                                          />
                                          <TextField
                                            id="standard-read-only-input"
                                            label="Sala Antiga"
                                            defaultValue={aulasData[infoClick].salaAntiga}
                                            InputProps={{
                                              readOnly: true,
                                            }}
                                            sx={{
                                              width: 150,
                                              marginRight: '40px',
                                            }}
                                            variant='standard'
                                          />
                                          <TextField
                                            id="standard-read-only-input"
                                            label="Professor"
                                            defaultValue={aulasData[infoClick].professor}
                                            InputProps={{
                                              readOnly: true,
                                            }}
                                            sx={{
                                              width: 150,
                                              marginRight: '40px',
                                            }}
                                            variant='standard'
                                          />
                                        </div>
                                      </Box>
                                    </p>
                                    <ChildModal />
                                  </Box>
                                </Modal>
                              </div>
                              :
                              <div>
                                <Modal
                                  open={open}
                                  onClose={handleClose}
                                  aria-labelledby="parent-modal-title"
                                  aria-describedby="parent-modal-description"
                                >
                                  <Box sx={{ ...style, width: '70%', textAlign: 'center' }}>
                                    <h2 id="parent-modal-title">CRIAR <b>NOVA AULA</b></h2>
                                    <p id="parent-modal-description">
                                      <Box sx={{ marginBottom: '20px', textAlign: 'center', paddingLeft: '70px' }}>
                                        <div sx={{ display: 'flex', }}>
                                          <TextField
                                            id="standard-read-only-input"
                                            label="Início"
                                            defaultValue={newAula[1].slice(+11)}
                                            InputProps={{
                                              readOnly: true,
                                            }}
                                            sx={{
                                              width: 65,
                                              marginRight: '40px',
                                            }}
                                            variant='standard'
                                          />
                                          <TextField
                                            id="standard-read-only-input"
                                            label="Fim"
                                            defaultValue={newAula[2].slice(+11)}
                                            InputProps={{
                                              readOnly: true,
                                            }}
                                            sx={{
                                              width: 65,
                                              marginRight: '40px',
                                            }}
                                            variant='standard'
                                          />
                                          <TextField
                                            id="standard-read-only-input"
                                            label="Disciplina"
                                            defaultValue={''}
                                            InputProps={{
                                              readOnly: true,
                                            }}
                                            variant='standard'
                                            sx={{
                                              width: 160,
                                              marginRight: '40px',
                                            }}
                                          />
                                          <TextField
                                            id="standard-read-only-input"
                                            label="Disciplina Antiga"
                                            defaultValue={''}
                                            InputProps={{
                                              readOnly: true,
                                            }}
                                            sx={{
                                              width: 160,
                                              marginRight: '40px',
                                            }}
                                            variant='standard'
                                          />
                                        </div>
                                      </Box>
                                      <Box sx={{ marginBottom: '20px', paddingLeft: 10 }}>
                                        <div sx={{ display: 'flex', }}>
                                          <TextField
                                            id="standard-read-only-input"
                                            label="Sala"
                                            defaultValue={newAula[0]}
                                            InputProps={{
                                              readOnly: true,
                                            }}
                                            sx={{
                                              width: 150,
                                              marginRight: '40px',
                                            }}
                                            variant='standard'
                                          />
                                          <TextField
                                            id="standard-read-only-input"
                                            label="Sala Antiga"
                                            defaultValue={''}
                                            InputProps={{
                                              readOnly: true,
                                            }}
                                            sx={{
                                              width: 150,
                                              marginRight: '40px',
                                            }}
                                            variant='standard'
                                          />
                                          <TextField
                                            id="standard-read-only-input"
                                            label="Professor"
                                            defaultValue={''}
                                            InputProps={{
                                              readOnly: true,
                                            }}
                                            sx={{
                                              width: 150,
                                              marginRight: '40px',
                                            }}
                                            variant='standard'
                                          />
                                        </div>
                                      </Box>
                                    </p>
                                    <ChildModal />
                                  </Box>
                                </Modal>
                              </div>
                            :
                            <div>
                              <Modal
                                open={open}
                                onClose={handleClose}
                                aria-labelledby="parent-modal-title"
                                aria-describedby="parent-modal-description"
                              >
                                <Box sx={{ ...style, width: 400 }}>
                                  <h2 id="parent-modal-title">{title}</h2>
                                  <p id="parent-modal-description">
                                    Sem Informações
                                  </p>
                                </Box>
                              </Modal>
                            </div>
                          }
                        </Grid>
                      )
                    }
                  })}
                </Grid>
              </Box>
            </div>
            {open ?
              !openNew ?
                <div>
                  <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="parent-modal-title"
                    aria-describedby="parent-modal-description"
                  >
                    <Box sx={{ ...style, width: '70%', textAlign: 'center' }}>
                      <h2 id="parent-modal-title">INFORMAÇÕES DE <b>{aulasData[infoClick].title}</b></h2>
                      <p id="parent-modal-description">
                        <Box sx={{ marginBottom: '20px', textAlign: 'center', paddingLeft: '70px' }}>
                          <div sx={{ display: 'flex', }}>
                            <TextField
                              id="standard-read-only-input"
                              label="Início"
                              defaultValue={aulasData[infoClick].dataInicio}
                              InputProps={{
                                readOnly: true,
                              }}
                              sx={{
                                width: 65,
                                marginRight: '40px',
                              }}
                              variant='standard'
                            />
                            <TextField
                              id="standard-read-only-input"
                              label="Fim"
                              defaultValue={aulasData[infoClick].dataFim}
                              InputProps={{
                                readOnly: true,
                              }}
                              sx={{
                                width: 65,
                                marginRight: '40px',
                              }}
                              variant='standard'
                            />
                            <TextField
                              id="standard-read-only-input"
                              label="Disciplina"
                              defaultValue={aulasData[infoClick].alterado == 3 ? aulasData[infoClick].description : aulasData[infoClick].description.slice(aulasData[infoClick].description.indexOf(': ') + 2)}
                              InputProps={{
                                readOnly: true,
                              }}
                              variant='standard'
                              sx={{
                                width: 160,
                                marginRight: '40px',
                              }}
                            />
                            <TextField
                              id="standard-read-only-input"
                              label="Disciplina Antiga"
                              defaultValue={aulasData[infoClick].disciplinaAntiga}
                              InputProps={{
                                readOnly: true,
                              }}
                              sx={{
                                width: 160,
                                marginRight: '40px',
                              }}
                              variant='standard'
                            />
                          </div>
                        </Box>
                        <Box sx={{ marginBottom: '20px', paddingLeft: 10 }}>
                          <div sx={{ display: 'flex', }}>
                            <TextField
                              id="standard-read-only-input"
                              label="Sala"
                              defaultValue={aulasData[infoClick].resourceId}
                              InputProps={{
                                readOnly: true,
                              }}
                              sx={{
                                width: 150,
                                marginRight: '40px',
                              }}
                              variant='standard'
                            />
                            <TextField
                              id="standard-read-only-input"
                              label="Sala Antiga"
                              defaultValue={aulasData[infoClick].salaAntiga}
                              InputProps={{
                                readOnly: true,
                              }}
                              sx={{
                                width: 150,
                                marginRight: '40px',
                              }}
                              variant='standard'
                            />
                            <TextField
                              id="standard-read-only-input"
                              label="Professor"
                              defaultValue={aulasData[infoClick].professor}
                              InputProps={{
                                readOnly: true,
                              }}
                              sx={{
                                width: 150,
                                marginRight: '40px',
                              }}
                              variant='standard'
                            />
                          </div>
                        </Box>
                      </p>
                      <ChildModal />
                    </Box>
                  </Modal>
                </div>
                :
                <div>
                  <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="parent-modal-title"
                    aria-describedby="parent-modal-description"
                  >
                    <Box sx={{ ...style, width: '70%', textAlign: 'center' }}>
                      <h2 id="parent-modal-title">CRIAR <b>NOVA AULA</b></h2>
                      <p id="parent-modal-description">
                        <Box sx={{ marginBottom: '20px', textAlign: 'center', paddingLeft: '70px' }}>
                          <div sx={{ display: 'flex', }}>
                            <TextField
                              id="standard-read-only-input"
                              label="Início"
                              defaultValue={newAula[1].slice(+11)}
                              InputProps={{
                                readOnly: true,
                              }}
                              sx={{
                                width: 65,
                                marginRight: '40px',
                              }}
                              variant='standard'
                            />
                            <TextField
                              id="standard-read-only-input"
                              label="Fim"
                              defaultValue={newAula[2].slice(+11)}
                              InputProps={{
                                readOnly: true,
                              }}
                              sx={{
                                width: 65,
                                marginRight: '40px',
                              }}
                              variant='standard'
                            />
                            <TextField
                              id="standard-read-only-input"
                              label="Disciplina"
                              defaultValue={''}
                              InputProps={{
                                readOnly: true,
                              }}
                              variant='standard'
                              sx={{
                                width: 160,
                                marginRight: '40px',
                              }}
                            />
                            <TextField
                              id="standard-read-only-input"
                              label="Disciplina Antiga"
                              defaultValue={''}
                              InputProps={{
                                readOnly: true,
                              }}
                              sx={{
                                width: 160,
                                marginRight: '40px',
                              }}
                              variant='standard'
                            />
                          </div>
                        </Box>
                        <Box sx={{ marginBottom: '20px', paddingLeft: 10 }}>
                          <div sx={{ display: 'flex', }}>
                            <TextField
                              id="standard-read-only-input"
                              label="Sala"
                              defaultValue={newAula[0]}
                              InputProps={{
                                readOnly: true,
                              }}
                              sx={{
                                width: 150,
                                marginRight: '40px',
                              }}
                              variant='standard'
                            />
                            <TextField
                              id="standard-read-only-input"
                              label="Sala Antiga"
                              defaultValue={''}
                              InputProps={{
                                readOnly: true,
                              }}
                              sx={{
                                width: 150,
                                marginRight: '40px',
                              }}
                              variant='standard'
                            />
                            <TextField
                              id="standard-read-only-input"
                              label="Professor"
                              defaultValue={''}
                              InputProps={{
                                readOnly: true,
                              }}
                              sx={{
                                width: 150,
                                marginRight: '40px',
                              }}
                              variant='standard'
                            />
                          </div>
                        </Box>
                      </p>
                      <ChildModal />
                    </Box>
                  </Modal>
                </div>
              :
              <div>
                <Modal
                  open={open}
                  onClose={handleClose}
                  aria-labelledby="parent-modal-title"
                  aria-describedby="parent-modal-description"
                >
                  <Box sx={{ ...style, width: 400 }}>
                    <h2 id="parent-modal-title"></h2>
                    <p id="parent-modal-description">
                      Sem Informações
                    </p>
                  </Box>
                </Modal>
              </div>
            }
          </div>
        </div >
      )
    }
    else {
      <div className='demo-app'>
        <div className='demo-app-main'>
          <ProgressIndicator open={loaded} />
        </div>
      </div>
    }
  }
  else if (userType == 1) {
    const optionsSala = ['SEM SALA', '0A', '0B', '1A', '1B', '1C', '1D', '2A', '2B', '2C', '2D', '2E', '3A', '3B', 'P2A', 'P2B', 'P2C', 'PV'];
    const optionsGruposSala = ['Sala Teorica - Piso 0', 'Sala Teorica - Piso 1', 'Sala Teorica - Piso 3', 'Sala Teorica - Polo', 'Sala Computadores - Piso 1', 'Sala Computadores - Piso 2'];
    const optionsHoraInicio = ['08:30:00', '09:45:00', '10:55:00', '12:00:00', '13:25:00', '14:30:00', '15:40:00', '16:45:00'];
    const optionsTurma = ['1º GPSI', '2º GPSI', '3º GPSI', '1º TM', '2º TM', '3º TM', '1º TEAC', '2º TEAC', '3º TEAC', '1º GEI', '2º GEI', '3º GEI', '1º TD3D', '2º TD3D', '3º TD3D', 'CEF',];


    return (
      <>
        <Box marginTop={'70px'} sx={{ backgroundColor: colors.fundo[500], textAlign: 'center', fontSize: 30, fontWeight: 'bold' }}>
          <Button sx={{ fontSize: 22 }} onClick={() => {
            setOpenSala(true);
          }}>PEDIR TROCA DE SALA</Button>

          <Modal
            open={openSala}
            onClose={handleCloseSala}
            aria-labelledby="parent-modal-title"
            aria-describedby="parent-modal-description"
          >
            <Box sx={{ ...style, width: '70%', textAlign: 'center' }}>
              <h2 id="parent-modal-title">PEDIR SALA</h2>
              <p id="parent-modal-description">
                <Box sx={{ marginBottom: '20px', textAlign: 'center', paddingLeft: '70px' }}>
                  <div sx={{ display: 'flex', }}>
                    <Box sx={{ display: 'flex', marginBottom: '20px', alignContent: 'center', justifyContent: 'center' }}>
                      <Autocomplete
                        value={valueSala}
                        onChange={(event, newValue) => {
                          setValueSala(newValue);
                        }}
                        inputValue={inputValueSala}
                        onInputChange={(event, newInputValue) => {
                          setInputValueSala(newInputValue);
                        }}
                        id="controllable-states-demo"
                        options={!grupoChecked ? optionsSala : optionsGruposSala}
                        sx={{
                          width: 180,
                          marginRight: '40px',
                        }}
                        renderInput={(params) => <TextField {...params} label="Sala" variant='standard' />}
                      />

                      <Autocomplete
                        value={valueHoraInicio}
                        onChange={(event, newValue) => {
                          setValueHoraInicio(newValue);
                        }}
                        inputValue={inputValueHoraInicio}
                        onInputChange={(event, newInputValue) => {
                          setInputValueHoraInicio(newInputValue);
                        }}
                        id="controllable-states-demo"
                        options={optionsHoraInicio}
                        sx={{
                          width: 180,
                          marginRight: '40px',
                        }}
                        renderInput={(params) => <TextField {...params} label="Hora de Início" variant='standard' />}
                      />

                      <Autocomplete
                        value={valueTurma}
                        onChange={(event, newValue) => {
                          setValueTurma(newValue);
                        }}
                        inputValue={inputValueTurma}
                        onInputChange={(event, newInputValue) => {
                          setInputValueTurma(newInputValue);
                        }}
                        id="controllable-states-demo"
                        options={optionsTurma}
                        sx={{
                          alignContent: 'center', justifyContent: 'center',
                          width: 140,
                          marginRight: '40px',
                        }}
                        renderInput={(params) => <TextField {...params} label="Turma" variant='standard' />}
                      />
                    </Box>
                    <Box sx={{ display: 'flex', marginLeft: "300px", marginBottom: '20px', justifyContent: 'flex-start' }}>
                      <FormGroup>
                        <FormControlLabel control={
                          <Checkbox
                            checked={grupoChecked}
                            onChange={handleCheckChange}
                            inputProps={{ 'aria-label': 'controlled' }}
                          />
                        } label="Grupo de Salas" />
                      </FormGroup>
                    </Box>
                  </div>
                  <Button sx={{ fontSize: 18, marginRight: '70px' }} onClick={() => {
                  }}>{grupoChecked ? 'PEDIR GRUPO SALA' : 'PEDIR SALA'}</Button>
                </Box>
              </p>
            </Box>
          </Modal >
        </Box >
      </>
    )
  } else {
    return (
      <>
        <Box marginTop={'70px'} sx={{ backgroundColor: colors.fundo[500], textAlign: 'center', fontSize: 30, fontWeight: 'bold' }}>
          NÃO TENS ACESSO A ESTA PÁGINA.<p></p>
          {authUser == null ?
            <p><Link sx={{ cursor: 'pointer' }} onClick={() => {
              window.location.replace('http://localhost:3000/entrar')
            }}>Autenticar</Link></p>
            :
            'DEVIDO AO SEU CARGO: Aluno'}
        </Box>
      </>
    )
  }
}

function renderEventContent(eventInfo) {
  return (
    <>
      <b>{eventInfo.timeText}</b>
      <div>
        <i>{eventInfo.event.title}</i>
        <br />
        <i>{eventInfo.event.extendedProps.description}</i>
      </div>
    </>
  )
}