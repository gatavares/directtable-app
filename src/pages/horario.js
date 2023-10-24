import React, { useContext, useState, useEffect } from 'react'
import { Divider, Grid, Box, Card, CardContent, Typography } from '@mui/material';
import { ColorModeContext, tokens } from '../theme';
import { useTheme } from '@mui/material/styles';

import * as RxIcons from 'react-icons/rx';

//Back-End
import axios from "axios";
import { ProgressIndicator } from '../components/ProgressIndicator';

function Horario() {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const ColorMode = useContext(ColorModeContext);
  const [loaded, setLoaded] = useState(false);
  const [updated, setUpdated] = useState(false);
  const [aulasData, setAulasData] = useState([])

  let data = [];
  let dataNova = [];
  let mins = 0

  let tempos = ['8:30', '9:45', '10:55', '12:00', '13:25', '14:30', '15:40', '16:45'];
  let temposInicio = ['08:30', '9:45', '10:55', '12', '13:25', '14:30', '15:40', '16:45'];
  let temposFim = ['09:30', '10:45', '11:55', '13', '14:25', '15:30', '16:40', '17:45'];
  let horaCorrenteInicio = '';
  let horaCorrenteFim = '';
  let horasTransformadaOnLoad = '';
  let horaCorrenteOnLoad = new Date().getMinutes() <= 9 ? new Date().getHours() + '.0' + new Date().getMinutes() : new Date().getHours() + '.' + new Date().getMinutes()
  let diaCorrenteOnLoad = new Date().toLocaleDateString()
  horaCorrenteOnLoad = parseFloat(horaCorrenteOnLoad)
  // console.log(horaCorrenteOnLoad)

  if (horaCorrenteOnLoad >= 7.30 && horaCorrenteOnLoad <= 9.30) {
    horasTransformadaOnLoad = tempos[0];
    horaCorrenteInicio = temposInicio[0];
    horaCorrenteFim = temposFim[0];
  }
  else if (horaCorrenteOnLoad >= 9.31 && horaCorrenteOnLoad <= 10.45) {
    horasTransformadaOnLoad = tempos[1];
    horaCorrenteInicio = temposInicio[1];
    horaCorrenteFim = temposFim[1];
  }
  else if (horaCorrenteOnLoad >= 10.46 && horaCorrenteOnLoad <= 11.55) {
    horasTransformadaOnLoad = tempos[2];
    horaCorrenteInicio = temposInicio[2];
    horaCorrenteFim = temposFim[2];
  }
  else if (horaCorrenteOnLoad >= 11.56 && horaCorrenteOnLoad <= 13.00) {
    horasTransformadaOnLoad = tempos[3];
    horaCorrenteInicio = temposInicio[3];
    horaCorrenteFim = temposFim[3];
  }
  else if (horaCorrenteOnLoad >= 13.01 && horaCorrenteOnLoad <= 14.25) {
    horasTransformadaOnLoad = tempos[4];
    horaCorrenteInicio = temposInicio[4];
    horaCorrenteFim = temposFim[4];
  }
  else if (horaCorrenteOnLoad >= 14.26 && horaCorrenteOnLoad <= 15.30) {
    horasTransformadaOnLoad = tempos[5];
    horaCorrenteInicio = temposInicio[5];
    horaCorrenteFim = temposFim[5];
  }
  else if (horaCorrenteOnLoad >= 15.31 && horaCorrenteOnLoad <= 16.40) {
    horasTransformadaOnLoad = tempos[6];
    horaCorrenteInicio = temposInicio[6];
    horaCorrenteFim = temposFim[6];
  }
  else if (horaCorrenteOnLoad >= 16.41 && horaCorrenteOnLoad <= 17.45) {
    horasTransformadaOnLoad = tempos[7];
    horaCorrenteInicio = temposInicio[7];
    horaCorrenteFim = temposFim[7];
  }
  else {
    horasTransformadaOnLoad = tempos[0];  //se passar das 17:45h
    horaCorrenteInicio = temposInicio[0];
    horaCorrenteFim = temposFim[0];
  }


  function dataAulaUpdate(data) {
    let horasTransformada = '';
    let horaCorrente = new Date().getMinutes() <= 9 ? new Date().getHours() + '.0' + new Date().getMinutes() : new Date().getHours() + '.' + new Date().getMinutes()
    horaCorrente = parseFloat(horaCorrente)

    if (horaCorrente >= 7.30 && horaCorrente <= 9.30) {
      horasTransformada = tempos[0];
      horaCorrenteInicio = temposInicio[0];
      horaCorrenteFim = temposFim[0];
    }
    else if (horaCorrente >= 9.31 && horaCorrente <= 10.45) {
      horasTransformada = tempos[1];
      horaCorrenteInicio = temposInicio[1];
      horaCorrenteFim = temposFim[1];
    }
    else if (horaCorrente >= 10.46 && horaCorrente <= 11.55) {
      horasTransformada = tempos[2];
      horaCorrenteInicio = temposInicio[2];
      horaCorrenteFim = temposFim[2];
    }
    else if (horaCorrente >= 11.56 && horaCorrente <= 13.00) {
      horasTransformada = tempos[3];
      horaCorrenteInicio = temposInicio[3];
      horaCorrenteFim = temposFim[3];
    }
    else if (horaCorrente >= 13.01 && horaCorrente <= 14.25) {
      horasTransformada = tempos[4];
      horaCorrenteInicio = temposInicio[4];
      horaCorrenteFim = temposFim[4];
    }
    else if (horaCorrente >= 14.26 && horaCorrente <= 15.30) {
      horasTransformada = tempos[5];
      horaCorrenteInicio = temposInicio[5];
      horaCorrenteFim = temposFim[5];
    }
    else if (horaCorrente >= 15.31 && horaCorrente <= 16.40) {
      horasTransformada = tempos[6];
      horaCorrenteInicio = temposInicio[6];
      horaCorrenteFim = temposFim[6];
    }
    else if (horaCorrente >= 16.41 && horaCorrente <= 17.45) {
      horasTransformada = tempos[7];
      horaCorrenteInicio = temposInicio[7];
      horaCorrenteFim = temposFim[7];
    }
    else {
      horasTransformada = tempos[0];  //se passar das 17:45h
      horaCorrenteInicio = temposInicio[0];
      horaCorrenteFim = temposFim[0];
    }

    console.log(mins + ' mins desde do ultimo carregamento de página!')
    let update = false;

    axios({
      method: "get",
      // url: `http://localhost:4000/carregar/turmas/8.30`,
      url: `http://localhost:4000/carregar/turmas/${horaCorrente}`,
    }).then((response) => {
      console.log('data antiga', data)
      console.log('data nova', response.data)

      response.data.forEach(element => {
        dataNova.push({
          turma: element.turma,
          sala: element.sala,
          salaAntiga: element.salaAntiga,
          disciplina: element.disciplina,
          disciplinaAntiga: element.disciplinaAntiga,
          professor: element.professor,
          alterado: element.alterado,
          dataStart: element.dataStart,
          dataEnd: element.dataEnd
        })
      });


      if (JSON.stringify(data) != JSON.stringify(response.data)) {
        console.log('Diferente!')
        window.location.reload();
      } else {
        console.log('Nada de Diferente!')
      }
      update = true;
    }).catch(alert);
  }



  useEffect(() => {
    //running the api call every one minute
    let horasTransformada = '';
    let horaCorrente = new Date().getMinutes() <= 9 ? new Date().getHours() + '.0' + new Date().getMinutes() : new Date().getHours() + '.' + new Date().getMinutes()
    horaCorrente = parseFloat(horaCorrente)

    if (horaCorrente >= 7.30 && horaCorrente <= 9.30) {
      horasTransformada = tempos[0];
      horaCorrenteInicio = temposInicio[0];
      horaCorrenteFim = temposFim[0];
    }
    else if (horaCorrente >= 9.31 && horaCorrente <= 10.45) {
      horasTransformada = tempos[1];
      horaCorrenteInicio = temposInicio[1];
      horaCorrenteFim = temposFim[1];
    }
    else if (horaCorrente >= 10.46 && horaCorrente <= 11.55) {
      horasTransformada = tempos[2];
      horaCorrenteInicio = temposInicio[2];
      horaCorrenteFim = temposFim[2];
    }
    else if (horaCorrente >= 11.56 && horaCorrente <= 13.00) {
      horasTransformada = tempos[3];
      horaCorrenteInicio = temposInicio[3];
      horaCorrenteFim = temposFim[3];
    }
    else if (horaCorrente >= 13.01 && horaCorrente <= 14.25) {
      horasTransformada = tempos[4];
      horaCorrenteInicio = temposInicio[4];
      horaCorrenteFim = temposFim[4];
    }
    else if (horaCorrente >= 14.26 && horaCorrente <= 15.30) {
      horasTransformada = tempos[5];
      horaCorrenteInicio = temposInicio[5];
      horaCorrenteFim = temposFim[5];
    }
    else if (horaCorrente >= 15.31 && horaCorrente <= 16.40) {
      horasTransformada = tempos[6];
      horaCorrenteInicio = temposInicio[6];
      horaCorrenteFim = temposFim[6];
    }
    else if (horaCorrente >= 16.41 && horaCorrente <= 17.45) {
      horasTransformada = tempos[7];
      horaCorrenteInicio = temposInicio[7];
      horaCorrenteFim = temposFim[7];
    }
    else {
      horasTransformada = tempos[0];  //se passar das 17:45h
      horaCorrenteInicio = temposInicio[0];
      horaCorrenteFim = temposFim[0];
      horaCorrente = 8.30;
    }
    console.log(horaCorrente)
    console.log(horaCorrenteInicio)
    console.log(horaCorrenteFim)

    axios({
      method: "get",
      url: `http://localhost:4000/carregar/turmas/${horaCorrente}`,
    }).then((response) => {
      console.log(response.data)
      response.data.forEach(element => {
        data.push({
          turma: element.turma,
          sala: element.sala,
          salaAntiga: element.salaAntiga,
          disciplina: element.disciplina,
          disciplinaAntiga: element.disciplinaAntiga,
          professor: element.professor,
          alterado: element.alterado,
          dataStart: element.dataStart,
          dataEnd: element.dataEnd
        })
      });
      setAulasData(data)
      setLoaded(true)
      setUpdated(true)

      const interval = setInterval(() => {
        mins = mins + 10;
        dataAulaUpdate(data)
      }, 600000); //60000 == 1 min, 300000 == 5 mins, 600000 == 10 mins
      return () => clearInterval(interval);
    }).catch(alert);
  }, [])


  return (
    <Box marginTop={'70px'} sx={{ backgroundColor: colors.fundo[500] }}>
      <div className="horaCorrente">
        <Box sx={{ display: 'flex', marginBottom: '20px', color: colors.texto[500] }}>
          <Typography sx={{ fontSize: '20px', fontWeight: 'bold' }}>
            {updated ? diaCorrenteOnLoad : []}
          </Typography>
          <Typography sx={{ fontSize: '20px', fontWeight: 'bold', marginLeft: '50px' }}>
            {updated ? horaCorrenteInicio + ' - ' + horaCorrenteFim : []}
          </Typography>
        </Box>
      </div>

      <div className="aulasCorrentes">
        <Grid container spacing={5}>
          {/* GPSI */}
          <Grid item xs={12} sm={12} md={6} lg={2}>
            <Grid container direction="column">
              {aulasData.map(({ turma, sala, disciplina, alterado }, index) => {
                if (index <= 2) {
                  return (
                    <Grid item xs={12} sm={12} md={6} lg={2} spacing={10} sx={{ marginBottom: 6 }}>
                      <Card key={turma} elevation={5} sx={{
                        display: 'flex', justifyContent: 'center', textAlign: 'center',
                        minWidth: 180, width: '100%',
                        backgroundColor: alterado == 0 ? colors.fundo[400] : alterado == 1 ? colors.sala[500] : alterado == 2 ? colors.disciplina[500] : colors.cancelado[500],
                        color: colors.texto[500],
                        border: '1px solid', borderColor: colors.texto[500], borderRadius: '10px',
                        '.css-46bh2p-MuiCardContent-root': {
                          paddingTop: '-14px',
                        },
                        '.css-46bh2p-MuiCardContent-root:last-child': {
                          paddingBottom: '10px',
                        },
                      }}>
                        <CardContent>
                          <Typography sx={{ fontSize: '1.3rem', fontWeight: 'bold' }} component="div" >
                            {turma}
                          </Typography>
                          <Typography sx={{ mt: 1 }}>
                          </Typography>
                          {alterado === 3 ?
                            <Typography sx={{ fontSize: '1.2rem', color: colors.cancelado[500] }}>
                              {disciplina}
                            </Typography>
                            :
                            <Typography sx={{ fontSize: '1.2rem' }}>
                              {disciplina}
                            </Typography>
                          }
                          <Typography sx={{ mt: 1 }}>
                          </Typography>
                          <Typography sx={{ fontSize: '1.2rem', fontWeight: 'bold' }}>
                            {sala}
                          </Typography>
                        </CardContent>
                      </Card>
                    </Grid>
                  )
                }
              })}
            </Grid>
          </Grid>

          {/* TM */}
          <Grid item xs={12} sm={12} md={6} lg={2}>
            <Grid container direction="column">
              {aulasData.map(({ turma, sala, disciplina, alterado }, index) => {
                if (index >= 3 && index <= 5) {
                  return (
                    <Grid item xs={12} sm={12} md={6} lg={2} spacing={10} sx={{ marginBottom: 6 }}>
                      <Card key={turma} elevation={5} sx={{
                        display: 'flex', justifyContent: 'center', textAlign: 'center',
                        minWidth: 180, width: '100%',
                        backgroundColor: alterado == 0 ? colors.fundo[400] : alterado == 1 ? colors.sala[500] : alterado == 2 ? colors.disciplina[500] : colors.cancelado[500],
                        color: colors.texto[500],
                        border: '1px solid', borderColor: colors.texto[500], borderRadius: '10px',
                        '.css-46bh2p-MuiCardContent-root': {
                          paddingTop: '-14px',
                        },
                        '.css-46bh2p-MuiCardContent-root:last-child': {
                          paddingBottom: '10px',
                        },
                      }}>
                        <CardContent>
                          <Typography sx={{ fontSize: '1.3rem', fontWeight: 'bold' }} component="div" >
                            {turma}
                          </Typography>
                          <Typography sx={{ mt: 1 }}>
                          </Typography>
                          {alterado === 3 ?
                            <Typography sx={{ fontSize: '1.2rem', color: colors.cancelado[500] }}>
                              {disciplina}
                            </Typography>
                            :
                            <Typography sx={{ fontSize: '1.2rem' }}>
                              {disciplina}
                            </Typography>
                          }
                          <Typography sx={{ mt: 1 }}>
                          </Typography>
                          <Typography sx={{ fontSize: '1.2rem', fontWeight: 'bold' }}>
                            {sala}
                          </Typography>
                        </CardContent>
                      </Card>
                    </Grid>
                  )
                }
              })}
            </Grid>
          </Grid>

          {/* TEAC */}
          <Grid item xs={12} sm={12} md={6} lg={2}>
            <Grid container direction="column">
              {aulasData.map(({ turma, sala, disciplina, alterado }, index) => {
                if (index >= 6 && index <= 8) {
                  return (
                    <Grid item xs={12} sm={12} md={6} lg={2} spacing={10} sx={{ marginBottom: 6 }}>
                      <Card key={turma} elevation={5} sx={{
                        display: 'flex', justifyContent: 'center', textAlign: 'center',
                        minWidth: 180, width: '100%',
                        backgroundColor: alterado == 0 ? colors.fundo[400] : alterado == 1 ? colors.sala[500] : alterado == 2 ? colors.disciplina[500] : colors.cancelado[500],
                        color: colors.texto[500],
                        border: '1px solid', borderColor: colors.texto[500], borderRadius: '10px',
                        '.css-46bh2p-MuiCardContent-root': {
                          paddingTop: '-14px',
                        },
                        '.css-46bh2p-MuiCardContent-root:last-child': {
                          paddingBottom: '10px',
                        },
                      }}>
                        <CardContent>
                          <Typography sx={{ fontSize: '1.3rem', fontWeight: 'bold' }} component="div" >
                            {turma}
                          </Typography>
                          <Typography sx={{ mt: 1 }}>
                          </Typography>
                          {alterado === 3 ?
                            <Typography sx={{ fontSize: '1.2rem', color: colors.cancelado[500] }}>
                              {disciplina}
                            </Typography>
                            :
                            <Typography sx={{ fontSize: '1.2rem' }}>
                              {disciplina}
                            </Typography>
                          }
                          <Typography sx={{ mt: 1 }}>
                          </Typography>
                          <Typography sx={{ fontSize: '1.2rem', fontWeight: 'bold' }}>
                            {sala}
                          </Typography>
                        </CardContent>
                      </Card>
                    </Grid>
                  )
                }
              })}
            </Grid>
          </Grid>

          {/* GEI */}
          <Grid item xs={12} sm={12} md={6} lg={2}>
            <Grid container direction="column">
              {aulasData.map(({ turma, sala, disciplina, alterado }, index) => {
                if (index >= 9 && index <= 11) {
                  return (
                    <Grid item xs={12} sm={12} md={6} lg={2} spacing={10} sx={{ marginBottom: 6 }}>
                      <Card key={turma} elevation={5} sx={{
                        display: 'flex', justifyContent: 'center', textAlign: 'center',
                        minWidth: 180, width: '100%',
                        backgroundColor: alterado == 0 ? colors.fundo[400] : alterado == 1 ? colors.sala[500] : alterado == 2 ? colors.disciplina[500] : colors.cancelado[500],
                        color: colors.texto[500],
                        border: '1px solid', borderColor: colors.texto[500], borderRadius: '10px',
                        '.css-46bh2p-MuiCardContent-root': {
                          paddingTop: '-14px',
                        },
                        '.css-46bh2p-MuiCardContent-root:last-child': {
                          paddingBottom: '10px',
                        },
                      }}>
                        <CardContent>
                          <Typography sx={{ fontSize: '1.3rem', fontWeight: 'bold' }} component="div" >
                            {turma}
                          </Typography>
                          <Typography sx={{ mt: 1 }}>
                          </Typography>
                          {alterado === 3 ?
                            <Typography sx={{ fontSize: '1.2rem', color: colors.cancelado[500] }}>
                              {disciplina}
                            </Typography>
                            :
                            <Typography sx={{ fontSize: '1.2rem' }}>
                              {disciplina}
                            </Typography>
                          }
                          <Typography sx={{ mt: 1 }}>
                          </Typography>
                          <Typography sx={{ fontSize: '1.2rem', fontWeight: 'bold' }}>
                            {sala}
                          </Typography>
                        </CardContent>
                      </Card>
                    </Grid>
                  )
                }
              })}
            </Grid>
          </Grid>

          {/* TD3D */}
          <Grid item xs={12} sm={12} md={6} lg={2}>
            <Grid container direction="column">
              {aulasData.map(({ turma, sala, disciplina, alterado }, index) => {
                if (index >= 12 && index <= 14) {
                  return (
                    <Grid item xs={12} sm={12} md={6} lg={2} spacing={10} sx={{ marginBottom: 6 }}>
                      <Card key={turma} elevation={5} sx={{
                        display: 'flex', justifyContent: 'center', textAlign: 'center',
                        minWidth: 180, width: '100%',
                        backgroundColor: alterado == 0 ? colors.fundo[400] : alterado == 1 ? colors.sala[500] : alterado == 2 ? colors.disciplina[500] : colors.cancelado[500],
                        color: colors.texto[500],
                        border: '1px solid', borderColor: colors.texto[500], borderRadius: '10px',
                        '.css-46bh2p-MuiCardContent-root': {
                          paddingTop: '-14px',
                        },
                        '.css-46bh2p-MuiCardContent-root:last-child': {
                          paddingBottom: '10px',
                        },
                      }}>
                        <CardContent>
                          <Typography sx={{ fontSize: '1.3rem', fontWeight: 'bold' }} component="div" >
                            {turma}
                          </Typography>
                          <Typography sx={{ mt: 1 }}>
                          </Typography>
                          {alterado === 3 ?
                            <Typography sx={{ fontSize: '1.2rem', color: colors.cancelado[500] }}>
                              {disciplina}
                            </Typography>
                            :
                            <Typography sx={{ fontSize: '1.2rem' }}>
                              {disciplina}
                            </Typography>
                          }
                          <Typography sx={{ mt: 1 }}>
                          </Typography>
                          <Typography sx={{ fontSize: '1.2rem', fontWeight: 'bold' }}>
                            {sala}
                          </Typography>
                        </CardContent>
                      </Card>
                    </Grid>
                  )
                }
              })}
            </Grid>
          </Grid>

          <Grid item xs={12} sm={12} md={6} lg={2}>
            <Grid container direction="column">
              {aulasData.map(({ turma, sala, disciplina, alterado }, index) => {
                if (index == 15) {
                  return (
                    <Grid item xs={12} sm={12} md={6} lg={2} spacing={10} sx={{ marginBottom: 6 }}>
                      <Card key={turma} elevation={5} sx={{
                        display: 'flex', justifyContent: 'center', textAlign: 'center',
                        minWidth: 180, width: '100%',
                        backgroundColor: alterado == 0 ? colors.fundo[400] : alterado == 1 ? colors.sala[500] : alterado == 2 ? colors.disciplina[500] : colors.cancelado[500],
                        color: colors.texto[500],
                        border: '1px solid', borderColor: colors.texto[500], borderRadius: '10px',
                        '.css-46bh2p-MuiCardContent-root': {
                          paddingTop: '-14px',
                        },
                        '.css-46bh2p-MuiCardContent-root:last-child': {
                          paddingBottom: '10px',
                        },
                      }}>
                        <CardContent>
                          <Typography sx={{ fontSize: '1.3rem', fontWeight: 'bold' }} component="div" >
                            {turma}
                          </Typography>
                          <Typography sx={{ mt: 1 }}>
                          </Typography>
                          <Typography sx={{ fontSize: '1.2rem' }}>
                            {disciplina}
                          </Typography>
                          <Typography sx={{ mt: 1 }}>
                          </Typography>
                          <Typography sx={{ fontSize: '1.2rem', fontWeight: 'bold' }}>
                            {sala}
                          </Typography>
                        </CardContent>
                      </Card>
                    </Grid>
                  )
                }
              })}
            </Grid>
          </Grid>
        </Grid>
      </div>

      <div className="alteracoes">
        <Box height={60} />
        <Divider sx={{ borderBottomWidth: '2px' }} />

        <Box sx={{ display: 'flex', marginBottom: '5px', color: colors.texto[500] }}>
          <Typography sx={{ fontSize: '20px', fontWeight: 'bold', marginTop: '10px' }}>
            Alterações
          </Typography>
        </Box>
        <Box>
          <Grid container >
            {aulasData.map(({ turma, sala, salaAntiga, disciplina, disciplinaAntiga, alterado }) => {
              if (alterado == 1) {
                return (
                  <Grid item xs={12} sm={12} md={6} lg={2}>
                    <Box sx={{ display: 'flex', fontSize: '23px', color: colors.salaTexto[500] }}>
                      <Typography sx={{ fontSize: '20px', marginRight: '10px' }}>{turma}:</Typography>
                      <Typography sx={{ fontSize: '20px', marginRight: '10px' }}>{salaAntiga}</Typography>
                      <RxIcons.RxDoubleArrowRight style={{ marginTop: '3px', marginRight: '10px' }} />
                      <Typography sx={{ fontSize: '20px' }}>{sala}</Typography>
                    </Box>
                  </Grid>
                )
              }
              if (alterado == 2) {
                return (
                  <Grid item xs={12} sm={12} md={6} lg={2}>
                    <Box sx={{ display: 'flex', fontSize: '23px', color: colors.disciplinaTexto[500] }}>
                      <Typography sx={{ fontSize: '20px', marginRight: '10px' }}>{turma}:</Typography>
                      <Typography sx={{ fontSize: '20px', marginRight: '10px' }}>{disciplinaAntiga}</Typography>
                      <RxIcons.RxDoubleArrowRight style={{ marginTop: '3px', marginRight: '10px' }} />
                      <Typography sx={{ fontSize: '20px' }}>{disciplina}</Typography>
                    </Box>
                  </Grid>
                )
              }
              if (alterado == 3) {
                return (
                  <Grid item xs={12} sm={12} md={6} lg={3}>
                    <Box sx={{ display: 'flex', fontSize: '23px', color: colors.canceladoTexto[500] }}>
                      <RxIcons.RxCross2 style={{ marginTop: '3px', marginRight: '10px' }} />
                      <Typography sx={{ fontSize: '20px', marginRight: '10px' }}>{turma}:</Typography>
                      <Typography sx={{ fontSize: '20px' }}>AULA CANCELADA!</Typography>
                    </Box>
                  </Grid>
                )
              }
            })}
          </Grid>
        </Box>
      </div>


      <ProgressIndicator open={loaded} />
    </Box >
  )
}

export default Horario