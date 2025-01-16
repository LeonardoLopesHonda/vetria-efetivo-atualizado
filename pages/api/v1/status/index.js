function status(request, response) {
  response.status(200).json({
    active_users: {
      Matricula: "000000001",
      "Cód. Filial": "1",
      "Nome Completo do Colaborador": "Leonardo Lopes Honda",
      "CPF - Número": "12345678912",
      "Data Nascimento": "26/12/2005",
      "Data Admissão": "20/05/2024",
      "Cód. Situação": "1",
      "Desc. Situação": "Ativo",
      "Cód. Centro Custo": "00000001",
      "Denominação do Centro de Custo": "GM - JOVENS APRENDIZES",
      "Cód. Cargo": "ip872",
      "Denominação do Cargo": "APRENDIZ EM ADMINISTRACAO",
      "Data de Rescisão": "",
    },
  });
}

export default status;
