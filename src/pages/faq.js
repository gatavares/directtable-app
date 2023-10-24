import { useTheme } from '@mui/material/styles';
import { ColorModeContext, tokens } from '../theme';
import React, { useContext } from 'react'
import { Divider, Box, Typography, Accordion, AccordionSummary, AccordionDetails, Link } from '@mui/material';
import { ExpandMoreIcon } from '@mui/icons-material';
import * as IoIcons from 'react-icons/io';


function FAQ() {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const ColorMode = useContext(ColorModeContext);

  return (
    <>
      <Box marginTop={'70px'} sx={{ backgroundColor: colors.fundo[500] }}>
        <Box sx={{ display: 'flex', justifyContent: 'center', fontSize: 30, fontWeight: 'bold' }}>
          <p>
            Algumas duvidas podem ser respondidas aqui!
          </p>
        </Box>
        <Box>
          <Accordion>
            <AccordionSummary
              expandIcon={<IoIcons.IoIosArrowDown />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography>Sou aluno, preciso de me autenticar?</Typography>
            </AccordionSummary>
            <Divider />
            <AccordionDetails>
              <Typography>
                Sendo aluno este sistema não requer qualquer autenticação. <p></p>Podes aceder à página dos <Link sx={{ cursor: 'pointer' }} onClick={() => { window.location.replace('http://localhost:3000/horario') }}>Horários</Link> para veres as aulas e salas neste momento.
              </Typography>
            </AccordionDetails>
          </Accordion>
          <Accordion>
            <AccordionSummary
              expandIcon={<IoIcons.IoIosArrowDown />}
              aria-controls="panel5a-content"
              id="panel5a-header"
            >
              <Typography>Como sei se houve alguma alteração na minha aula?</Typography>
            </AccordionSummary>
            <Divider />
            <AccordionDetails>
              <Typography>
                Para além da notificação no email institucional, podes observar na página dos <Link sx={{ cursor: 'pointer' }} onClick={() => { window.location.replace('http://localhost:3000/horario') }}>Horários</Link> as repetivas cores: <p></p>
                <Typography sx={{ color: colors.salaTexto[500] }}>- Alterações de Sala</Typography><p></p>
                <Typography sx={{ color: colors.disciplinaTexto[500] }}>- Alterações de Disciplina</Typography><p></p>
                <Typography sx={{ color: colors.canceladoTexto[500] }}>- Cancelamento de Aula</Typography>
              </Typography>
            </AccordionDetails>
          </Accordion>
          <Accordion>
            <AccordionSummary
              expandIcon={<IoIcons.IoIosArrowDown />}
              aria-controls="panel5a-content"
              id="panel5a-header"
            >
              <Typography>Como vejo em que sala vou ter aulas?</Typography>
            </AccordionSummary>
            <Divider />
            <AccordionDetails>
              <Typography>
                Na página dos <Link sx={{ cursor: 'pointer' }} onClick={() => { window.location.replace('http://localhost:3000/horario') }}>Horários</Link>, na 3ª linha do retângulo encontra-se a sala onde a turma se deve deslocar para a aula.
              </Typography>
            </AccordionDetails>
          </Accordion>
          <Accordion>
            <AccordionSummary
              expandIcon={<IoIcons.IoIosArrowDown />}
              aria-controls="panel3a-content"
              id="panel3a-header"
            >
              <Typography>A página de Horários não carrega. O que posso fazer?</Typography>
            </AccordionSummary>
            <Divider />
            <AccordionDetails>
              <Typography>
                Podes reportar na aba de <Link sx={{ cursor: 'pointer' }} onClick={() => { window.location.replace('http://localhost:3000/suporte') }}>Suporte</Link> o respetivo erro.
              </Typography>
            </AccordionDetails>
          </Accordion>
          <Accordion>
            <AccordionSummary
              expandIcon={<IoIcons.IoIosArrowDown />}
              aria-controls="panel4a-content"
              id="panel4a-header"
            >
              <Typography>As páginas de não estão a mostrar nenhuma informação. O que posso fazer?</Typography>
            </AccordionSummary>
            <Divider />
            <AccordionDetails>
              <Typography>
                Podes reportar na aba de <Link sx={{ cursor: 'pointer' }} onClick={() => { window.location.replace('http://localhost:3000/suporte') }}>Suporte</Link> o respetivo erro.
              </Typography>
            </AccordionDetails>
          </Accordion>
          <Accordion>
            <AccordionSummary
              expandIcon={<IoIcons.IoIosArrowDown />}
              aria-controls="panel5a-content"
              id="panel5a-header"
            >
              <Typography>O site não está eficiente e/ou não consigo conectar com o servidor.</Typography>
            </AccordionSummary>
            <Divider />
            <AccordionDetails>
              <Typography>
                Podes reportar na aba de <Link sx={{ cursor: 'pointer' }} onClick={() => { window.location.replace('http://localhost:3000/suporte') }}>Suporte</Link> o respetivo erro.<p></p>
                Caso não consigas contactar na aba de suporte, podes-te dirigir a um funcionário da secretaria da escola e reportar o ocorrido.
              </Typography>
            </AccordionDetails>
          </Accordion>
        </Box>
      </Box>
    </>
  )
}

export default FAQ