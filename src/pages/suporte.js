import { useTheme } from '@mui/material/styles';
import { ColorModeContext, tokens } from '../theme';
import React, { useContext } from 'react'
import { Box, Typography, TextField, Button } from '@mui/material';


function Suporte() {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const ColorMode = useContext(ColorModeContext);


  const [nome, setNome] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [mensagem, setMensagem] = React.useState('');
  return (
    <>
      <Box marginTop={'70px'} sx={{ backgroundColor: colors.fundo[500] }}>
        <Box>
          <Box sx={{ display: 'flex', justifyContent: 'center', fontSize: 30, fontWeight: 'bold' }}>
            <p>
              Suporte
            </p>
          </Box>
        </Box>
        <form>
          <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <TextField
              id="input-nome"
              label="Nome"
              value={nome}
              onChange={(event) => {
                setNome(event.target.value);
              }}
              sx={{ width: 800, marginTop: '20px' }}
            />
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <TextField
              id="input-Email"
              label="Email"
              value={email}
              onChange={(event) => {
                setEmail(event.target.value);
              }}
              sx={{ width: 800, marginTop: '20px' }}
            />
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <TextField
              multiline
              rows={5}
              id="input-Mensagem"
              label="Mensagem"
              value={mensagem}
              onChange={(event) => {
                setMensagem(event.target.value);
              }}
              sx={{ width: 800, marginTop: '20px' }}
            />
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
            <Button variant="outlined" onClick={() => { alert('Erro! Mensagem Enviada Com Sucesso!\nMas desativado para prevenção.') }}>Enviar</Button>
          </Box>
        </form>
      </Box>
    </>
  )
}

export default Suporte