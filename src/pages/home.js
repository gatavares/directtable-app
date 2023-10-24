import React, { useContext } from 'react'
import { Divider, Grid, Box, Card, CardActions, CardContent, Button, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { ColorModeContext, tokens } from '../theme';
import { useTheme } from '@mui/material/styles';


function createData(nome, inico, fim) {
  return { nome, inico, fim };
}

const datasAnoLetivo = [
  createData('1º', '15/09/2022', '16/12/2022'),
  createData('2º', '03/01/2023', '31/03/2023'),
  createData('3º', '17/04/2023', '31/07/2023'),
];

const interropcaoAnoLetivo = [
  createData('Natal', '19/12/2022', '02/01/2023'),
  createData('Carnaval', '20/02/2023', '22/02/2023'),
  createData('Páscoa', '03/04/2023', '14/04/2023'),
];

function Home() {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const ColorMode = useContext(ColorModeContext);

  return (
    <>
      <Box marginTop={'70px'} sx={{ backgroundColor: colors.fundo[500] }}>
        <div className="cards">
          <Grid container spacing={7}>
            <Grid item sm={12} md={6}>
              <Card sx={{ minWidth: 250, width: '100%', borderLeft: '5px solid', borderColor: colors.projectColor[500] }}>
                <CardContent>
                  {/* <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                    Calendário Escolar
                  </Typography> */}
                  <Typography variant="h5" component="div" >
                    Ano Letivo 2022/2023
                  </Typography>
                  <Typography sx={{ mt: 1.5 }}>
                    <Divider sx={{ borderColor: colors.projectColor[500] }} />
                  </Typography>
                  <Typography variant="body2">
                    <TableContainer>
                      <Table sx={{ minWidth: 250 }} aria-label="simple table">
                        <TableHead>
                          <TableRow>
                            <TableCell>Periodo</TableCell>
                            <TableCell align="center">Iníco</TableCell>
                            <TableCell align="right">Fim</TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {datasAnoLetivo.map((row) => (
                            <TableRow
                              key={row.nome}
                              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                              <TableCell component="th" scope="row">
                                {row.nome}
                              </TableCell>
                              <TableCell align="center">{row.inico}</TableCell>
                              <TableCell align="right">{row.fim}</TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </TableContainer>
                  </Typography>
                </CardContent>
                <CardActions sx={theme.palette.mode == 'dark' ? { backgroundColor: colors.primario[600] } : { backgroundColor: colors.fundo[500] }}>
                  <Button href='' size="small" sx={{ color: colors.texto[500], marginLeft: '4%' }}>Saber Mais</Button>
                </CardActions>
              </Card>
            </Grid>

            <Grid item sm={12} md={6}>
              <Card sx={{ minWidth: 250, width: '92%', borderLeft: '5px solid', borderColor: colors.projectColor[500] }}>
                <CardContent>
                  {/* <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                    Categoria
                  </Typography> */}
                  <Typography variant="h5" component="div">
                    Interrupções Letivas
                  </Typography>
                  <Typography sx={{ mt: 1.5 }}>
                    <Divider sx={{ borderColor: colors.projectColor[500] }} />
                  </Typography>
                  <Typography variant="body2">
                    <TableContainer>
                      <Table sx={{ minWidth: 250 }} aria-label="simple table">
                        <TableHead>
                          <TableRow>
                            <TableCell>Interropção</TableCell>
                            <TableCell align="center">Iníco</TableCell>
                            <TableCell align="right">Fim</TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {interropcaoAnoLetivo.map((row) => (
                            <TableRow
                              key={row.nome}
                              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                              <TableCell component="th" scope="row">
                                {row.nome}
                              </TableCell>
                              <TableCell align="center">{row.inico}</TableCell>
                              <TableCell align="right">{row.fim}</TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </TableContainer>
                  </Typography>
                </CardContent>
                <CardActions sx={theme.palette.mode == 'dark' ? { backgroundColor: colors.primario[600] } : { backgroundColor: colors.fundo[500] }}>
                  <Button href='' size="small" sx={{ color: colors.texto[500], marginLeft: '4%' }}>Saber Mais</Button>
                </CardActions>
              </Card>
            </Grid>
          </Grid>
        </div>
      </Box>
    </>
  )
}

export default Home                                                                                                     