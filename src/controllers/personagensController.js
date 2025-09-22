import personagens from "../models/dados.js";

export const getAll = (req, res) => {
    res.status(200).json({
        total: personagens.length,
        personagens
    });
};

export const getById = (req, res) => {
    const id = parseInt(req.params.id);

    const personagem = personagens.find(p => p.id === id);

    if(!personagem) {
        return res.status(404).json({
            message: "Personagem não encontrado! ❌"
        })
    }

    res.status(200).json(personagem);

};

export const create = (req, res) => {
    const { nome, idade, habilidade, grupo, vivo, localizacaoAtual } = req.body;

    if(!nome || !idade || !habilidade || !grupo || !vivo || !localizacaoAtual) {
        return res.status(404).json({
            message: "Preencha todos os campos! 📜"
        });
    }

     // 🧠 Regra 1: Idade entre 10 e 100
    if (idade < 10 || idade > 100) {
        return res.status(400).json({ message: "A idade deve estar entre 10 e 100 anos. ⏳" });
    }

     // 🧠 Regra 2: 'vivo' deve ser booleano
    if (typeof vivo !== "boolean") {
        return res.status(400).json({ message: "'vivo' deve ser true ou false. ✅❌" });
    }

     // 🧠 Regra 3: Se estiver no Mundo Invertido, não pode estar vivo
    if (localizacaoAtual.toLowerCase() === "mundo invertido" && vivo === true) {
        return res.status(400).json({
            message: "Personagens no Mundo Invertido não podem estar vivos! 🌑👻"
        });
    }

    // 🧠 Regra 4: Se estiver no grupo 'Amigos da Eleven', deve estar vivo
    if (grupo.toLowerCase() === "amigos da eleven" && vivo === false) {
        return res.status(400).json({
            message: "Personagens do grupo 'Amigos da Eleven' devem estar vivos! 🧇✨"
        });
    }

     // 🧠 Regra 5: Só pode existir UM Vecna
    const vecnaExiste = personagens.some(p => p.nome.toLowerCase() === "vecna");
    if (nome.toLowerCase() === "vecna" && vecnaExiste) {
        return res.status(400).json({
            message: "Já existe um personagem chamado Vecna! ❌👹"
        });
    }

    const novoPersonagem = {
        id: personagens.length +1,
        nome,
        idade,
        habilidade,
        grupo,
        vivo,
        localizacaoAtual
    };

    personagens.push(novoPersonagem);

     res.status(201).json({
        message: "Novo personagem adicionado com sucesso! 👾🩸",
        Personagem: novoPersonagem
    });
};

export const update = (req, res) => {
      const id = parseInt(req.params.id);
      const { nome, idade, habilidade, grupo, vivo, localizacaoAtual } = req.body; 
      
      const idParaEditar = id;

       if(isNaN(idParaEditar)){
        return res.status(400).json({
            success: false,
            message: "O id deve ser um número válido."
        })
    }

     const personagemExiste = personagens.find(personagem => personagem.id === idParaEditar);
    if(!personagemExiste){
        return res.status(404).json({
            success: false,
            message: `O personagem com o id: ${idParaEditar} não existe.`
        })
    }

     const personagensAtualizados = personagens.map(personagem => personagem.id === idParaEditar ? {
        ...personagem,
        ...(nome && { nome }),
        ...(idade && { idade }),
        ...(habilidade && { habilidade }),
        ...(grupo && { grupo }),
        ...(vivo && { vivo }),
        ...(localizacaoAtual && { localizacaoAtual })
}
  : personagem
);

 personagens.splice(0, personagens.length, ...personagensAtualizados);

 const personagemEditado = personagens.find(personagem => personagem.id === idParaEditar);
    res.status(200).json({
        success: true,
        message: "Dados atualizados com sucesso do Personagem. ✅",
        personagem: personagemExiste
    });

};

export const remove = (req, res) => {
    const { id } = req.params

    if (isNaN(id)) {
        return res.status(400).json({
            success: false,
            message: "O id deve ser válido"
        });
    }

    const idParaApagar = parseInt(id);

    const personagemParaRemover = personagens.find(p => p.id === idParaApagar);
    console.log(personagemParaRemover)

    if (!personagemParaRemover) {
        return res.status(404).json({
            success: false,
            message: "Personagem id não existe"
        });
    }

    const personagemFiltrado = personagens.filter(p => p.id !== id);
    console.log(personagemFiltrado)

    personagens.splice(0, personagens.length, ...personagemFiltrado);

    return res.status(200).json({
        success: true,
        message: "O personagem foi removido com sucesso! 🗑️"
    });
};