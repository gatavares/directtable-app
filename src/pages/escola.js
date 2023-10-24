import React, { useContext, useEffect, useState } from 'react';
import { useTheme } from '@mui/material/styles';
import { ColorModeContext, tokens } from '../theme';
import { Box, Button, Divider, Card, CardContent, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Modal, TextField, FormControl, InputLabel, FormHelperText, Link } from '@mui/material';
import { ProgressIndicator } from '../components/ProgressIndicator';

import * as FiIcons from 'react-icons/fi';
import * as BsIcons from 'react-icons/bs';

import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../pages/auth/firebase/firebase";
import { storage } from './auth/firebase/firebase';
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import axios from 'axios';
import * as XLSX from "xlsx";

function Escola() {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const ColorMode = useContext(ColorModeContext);
  const [save, setSave] = useState(true);
  const [isLoaded, setIsLoaded] = useState(false);

  const [fileURL, setFileURL] = useState("");
  let fileNum = 0;

  const [items, setItems] = useState([]);

  let horas = [];
  let loaded = false;
  const [horarios, setHorarios] = useState({})

  function createData(numero, nome, disciplinas) {
    return { numero, nome, disciplinas };
  }

  const readExcel = async (turma, index, file) => {
    const promise = new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsArrayBuffer(file);

      fileReader.onload = (e) => {
        const bufferArray = e.target.result;

        const wb = XLSX.read(bufferArray, { type: "buffer" });
        let data = [];

        // for (let y = 0; y < 16; y++) {
        const wsname = wb.SheetNames[index];
        console.log(index)

        const ws = wb.Sheets[wsname];

        data = XLSX.utils.sheet_to_json(ws);

        let y = 0
        for (y = 0; y < 8; y++) {
          horas.push({
            [JSON.stringify(data[y].Column1).slice(1, 5) == '8:30' || JSON.stringify(data[y].Column1).slice(1, 5) == '9:45' ? JSON.stringify(data[y].Column1).slice(1, 5) : JSON.stringify(data[y].Column1).slice(1, 6)]: {
              segunda: JSON.stringify(data[y].Column2) == '\"\"' ? '' : JSON.stringify(data[y].Column2).replace('\" ', '').replace('\"', ''),
              terca: JSON.stringify(data[y].Column3) == '\"\"' ? '' : JSON.stringify(data[y].Column3).replace('\" ', '').replace('\"', ''),
              quarta: JSON.stringify(data[y].Column4) == '\"\"' ? '' : JSON.stringify(data[y].Column4).replace('\" ', '').replace('\"', ''),
              quinta: JSON.stringify(data[y].Column5) == '\"\"' ? '' : JSON.stringify(data[y].Column5).replace('\" ', '').replace('\"', ''),
              sexta: JSON.stringify(data[y].Column6) == '\"\"' ? '' : JSON.stringify(data[y].Column6).replace('\" ', '').replace('\"', ''),
            }
          })
        }
        console.log(horas)

        if (horas.length >= 128) {
          loaded = true
        }
      };

      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  };

  async function sendData(file) {
    let turmas = ['1GPSI', '1TD3D', '1TEAC', '1GEI', '1TM', 'CEF', '2TD3D', '2TEAC', '2GEI', '2GPSI', '2TM', '3TD3D', '3GEI', '3TEAC', '3GPSI', '3TM'];

    for (let i = 0; i <= turmas.length; i++) {
      switch (i) {
        case 0:
          // console.log(turmas[i])
          await readExcel(turmas[i], i, file);
          break;
        case 1:
          // console.log(turmas[i])
          await readExcel(turmas[i], i, file);
          break;
        case 2:
          // console.log(turmas[i])
          await readExcel(turmas[i], i, file);
          break;
        case 3:
          // console.log(turmas[i])
          await readExcel(turmas[i], i, file);
          break;
        case 4:
          // console.log(turmas[i])
          await readExcel(turmas[i], i, file);
          break;
        case 5:
          // console.log(turmas[i])
          await readExcel(turmas[i], i, file);
          break;
        case 6:
          // console.log(turmas[i]);
          await readExcel(turmas[i], i, file);
          break;
        case 7:
          // console.log(turmas[i]);
          await readExcel(turmas[i], i, file);
          break;
        case 8:
          // console.log(turmas[i])
          await readExcel(turmas[i], i, file)
          break;
        case 9:
          // console.log(turmas[i])
          await readExcel(turmas[i], i, file)
          break;
        case 10:
          // console.log(turmas[i])
          await readExcel(turmas[i], i, file)
          break;
        case 11:
          // console.log(turmas[i])
          await readExcel(turmas[i], i, file)
          break;
        case 12:
          // console.log(turmas[i])
          await readExcel(turmas[i], i, file)
          break;
        case 13:
          // console.log(turmas[i])
          await readExcel(turmas[i], i, file)
          break;
        case 14:
          // console.log(turmas[i])
          await readExcel(turmas[i], i, file)
          break;
        case 15:
          // console.log(turmas[i])
          await readExcel(turmas[i], i, file)
          break;
      }
    }


    setTimeout(function () {
      console.log(JSON.stringify(horas));

      setTimeout(async function () {
        axios.post("http://localhost:4000/dados/horarios", { dados: horas }).then((res) => {
          console.log(res);
          if (res.status == 200) {
            setSave(true);
            window.location.reload();
          }
        }).catch((erro) => {
          console.log(erro)
          alert(erro.response.data)
        });
      }, 3500);
    }, 6000);

    //firebase
    const storageRef = ref(storage, `horarios/${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {

      },
      (error) => {
        alert(error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setFileURL(downloadURL);
        });
      }
    );
  }


  let data = [];
  const [professores, setProfessores] = useState()
  let i = 0;
  useEffect(() => {
    axios({
      method: "get",
      url: `http://localhost:4000/carregar/professores`,
    }).then((response) => {
      // console.log(response.data)
      for (i = 0; i < response.data.length; i++) {
        data = data.concat(createData(response.data[i].numero.toString(), response.data[i].nome, response.data[i].disciplinas))
        setProfessores(data)
      }
      if (i == response.data.length) {
        // console.log('professores:' + JSON.stringify(professores))
        setIsLoaded(true)
      }
    }).catch(alert);
  }, [])


  const [authUser, setAuthUser] = useState(null);
  let userCache = false
  useEffect(() => {
    const listen = onAuthStateChanged(auth, (user) => {
      if (user) {
        setAuthUser(user);
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



  const [open, setOpen] = useState(false);
  const [openNew, setOpenNew] = useState(false);
  const [infoClick, setInfoClick] = useState(false);
  const [updated, setUpdated] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpenNew = () => {
    setOpenNew(true);
    setOpen(true);
    setInfoClick(99999);
  };


  function updateProfessor(numero, nome, disciplinas) {
    let disciplinasArr = disciplinas.split(', ')

    axios.post("http://localhost:4000/dados/professor", { numero: numero, nome: nome, disciplinas: disciplinasArr }).then((res) => {
      console.log(res);
      if (res.status == 200) {
        setUpdated(true);
        handleClose();
        window.location.reload();
      }
    }).catch((erro) => {
      console.log(erro)
      alert(erro.response.data)
    });
  }

  function ChildModal() {
    const [open, setOpen] = React.useState(false);

    const handleOpen = () => {
      setOpen(true);
    };
    const handleClose = () => {
      setOpen(false);
    };


    const [numero, setNumero] = React.useState(infoClick.numero);
    const [nome, setNome] = React.useState(infoClick.nome);
    const [disciplinas, setDisciplinas] = React.useState(infoClick.disciplinas);

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
              <h2 id="parent-modal-title" sx={{ display: 'flex' }}>INFORMAÇÕES DE <b>{infoClick.numero}</b></h2>
              <p id="parent-modal-description">
                <Box sx={{ marginBottom: '20px', display: 'flex', alignContent: 'center', justifyContent: 'center' }}>
                  <div sx={{ display: 'flex', alignContent: 'center', justifyContent: 'center' }}>
                    <Box sx={{ display: 'flex', marginBottom: '20px', textAlign: 'center', alignContent: 'center', justifyContent: 'center' }}>
                      <TextField
                        id="input-numero"
                        label="Número"
                        variant="standard"
                        value={numero}
                        onChange={(event) => {
                          setNumero(event.target.value);
                        }}
                        sx={{ marginRight: '40px' }}
                      />
                      <TextField
                        id="input-nome"
                        label="Nome"
                        variant="standard"
                        value={nome}
                        onChange={(event) => {
                          setNome(event.target.value);
                        }}
                        sx={{ marginRight: '40px' }}
                      />
                      <FormControl variant="standard">
                        <TextField
                          id="input-disciplinas"
                          label="Disciplinas"
                          variant="standard"
                          value={disciplinas}
                          onChange={(event) => {
                            setDisciplinas(event.target.value);
                          }}
                        />
                        <FormHelperText id="component-helper-text">
                          SEPARAR COM VIRGULA E ESPAÇO: ", "
                        </FormHelperText>
                      </FormControl>
                    </Box>
                  </div>
                </Box>
                <Button onClick={() => { updateProfessor(numero, nome, disciplinas) }}>Confirmar Alterações</Button>
              </p>
            </Box>
          </form>
        </Modal >
      </React.Fragment >
    );
  }

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

  if (userType >= 2) {
    return (
      <>
        <Box marginTop={'70px'} sx={{ backgroundColor: colors.fundo[500] }}>
          <Box sx={{ display: 'flex', justifyContent: 'end', marginRight: '4%' }}>
            <Button variant="outlined" startIcon={<BsIcons.BsCalendar2Range />} component="label" sx={{ fontWeight: 'bolder', borderColor: colors.icons[500], color: colors.icons[500], marginRight: '2%', ':hover': { borderColor: colors.texto[500], color: colors.texto[500], } }}>
              IMPORTAR HORÁRIOS
              <input hidden accept=".xlsx" type="file" id='horario' onChange={() => {
                const uploadFileEle = document.getElementById("horario");
                setSave(false);
                sendData(uploadFileEle.files[fileNum]);
                fileNum = fileNum++;
              }} />
            </Button>
            <Button variant="outlined" startIcon={<FiIcons.FiPlus />} component="label" sx={{ fontWeight: 'bolder', borderColor: colors.icons[500], color: colors.icons[500], ':hover': { borderColor: colors.texto[500], color: colors.texto[500], } }}>
              ADICIONAR PROFESSOR
              {/* <input hidden accept="" type="file" /> so se for para importar por ficheiro, se nao fazer modal ou pagina. */}
            </Button>
          </Box>

          {isLoaded ?
            <Box sx={{ marginTop: '25px' }}>
              <Card sx={{ minWidth: 250, width: '100%', borderLeft: '5px solid', borderColor: colors.projectColor[500] }}>
                <CardContent>
                  <Typography variant="h5" component="div" >
                    Professores
                  </Typography>
                  <Typography sx={{ mt: 1.5 }}>
                    <Divider sx={{ borderColor: colors.projectColor[500] }} />
                  </Typography>
                  <Typography variant="body2">
                    <TableContainer sx={{ maxHeight: 400 }}>
                      <Table sx={{ minWidth: 250 }} stickyHeader aria-label="sticky table">
                        <TableHead>
                          <TableRow>
                            <TableCell>Número</TableCell>
                            <TableCell>Nome</TableCell>
                            <TableCell>Disciplinas</TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {professores.map((professor) => (
                            <TableRow
                              hover
                              key={professor.numero}
                              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                              onClick={() => {
                                // alert(professor.numero)
                                setInfoClick({
                                  'numero': professor.numero,
                                  'nome': professor.nome,
                                  'disciplinas': professor.disciplinas,
                                })
                                setOpen(true);
                              }}
                            >
                              <TableCell component="th" scope="row">
                                {professor.numero}
                              </TableCell>
                              <TableCell align="left">{professor.nome}</TableCell>
                              <TableCell align="left">{professor.disciplinas}</TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </TableContainer>
                  </Typography>
                </CardContent>
              </Card>
            </Box>
            :
            []
          }

          <Box>
            {open ?
              <div>
                <Modal
                  open={open}
                  onClose={handleClose}
                  aria-labelledby="parent-modal-title"
                  aria-describedby="parent-modal-description"
                >
                  <Box sx={{ ...style, width: '70%', textAlign: 'center' }}>
                    <h2 id="parent-modal-title">INFORMAÇÕES DE <b>{infoClick.numero}</b></h2>
                    <p id="parent-modal-description">
                      <Box sx={{ marginBottom: '20px', textAlign: 'center', paddingLeft: '70px' }}>
                        <div sx={{ display: 'flex', }}>
                          <TextField
                            id="standard-read-only-input"
                            label="Nome"
                            defaultValue={infoClick.nome}
                            InputProps={{
                              readOnly: true,
                            }}
                            sx={{
                              width: 165,
                              marginRight: '40px',
                            }}
                            variant='standard'
                          />
                          <TextField
                            id="standard-read-only-input"
                            label="numero"
                            defaultValue={infoClick.numero}
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
                            label="Disciplinas"
                            defaultValue={infoClick.disciplinas}
                            InputProps={{
                              readOnly: true,
                            }}
                            variant='standard'
                            sx={{
                              width: 150,
                              marginRight: '40px',
                            }}
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
                    <h2 id="parent-modal-title">{ }</h2>
                    <p id="parent-modal-description">
                      Sem Informações
                    </p>
                  </Box>
                </Modal>
              </div>
            }
          </Box>

          <ProgressIndicator open={save} />
          <ProgressIndicator open={isLoaded} />
        </Box >
      </>
    )
  }
  else {
    return (
      <>
        <Box marginTop={'70px'} sx={{ backgroundColor: colors.fundo[500], textAlign: 'center', fontSize: 30, fontWeight: 'bold' }}>
          NÃO TENS ACESSO A ESTA PÁGINA.<p></p>
          {authUser == null ?
            <p><Link sx={{ cursor: 'pointer' }} onClick={() => {
              window.location.replace('http://localhost:3000/entrar')
            }}>Autenticar</Link></p>
            :
            'DEVIDO AO SEU CARGO: '} {authUser != null && userType == 1 ? 'Professor' : authUser != null && userType == 0 ? 'Aluno' : ''}
        </Box>
      </>
    )
  }
}

export default Escola