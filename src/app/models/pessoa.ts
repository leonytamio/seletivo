export interface Pessoa {
    id: number;
    nome: string;
    idade: number;
    sexo: Sexo;
    vivo: boolean;
    urlFoto: string;
    ultimaOcorrencia: {
      dtDesaparecimento: string;
      dataLocalizacao: string;
      encontradoVivo: boolean;
      localDesaparecimentoConcat: string;
      ocorrenciaEntrevDesapDTO: {
        informacao: string;
        vestimentasDesaparecido: string;
      };
      listaCartaz: {
        urlCartaz: string;
        tipoCartaz: TipoCartaz;
      }[];
      ocoId: number;
    };
  }
  
  export enum Sexo {
    MASCULINO = 'Masculino',
    FEMININO = 'Feminino'
  }
  
  export enum TipoCartaz {
    PDF_DESAPARECIDO = 'PDF_DESAPARECIDO',
    PDF_LOCALIZADO = 'PDF_LOCALIZADO',
    JPG_DESAPARECIDO = 'JPG_DESAPARECIDO',
    JPG_LOCALIZADO = 'JPG_LOCALIZADO',
    INSTA_DESAPARECIDO = 'INSTA_DESAPARECIDO',
    INSTA_LOCALIZADO = 'INSTA_LOCALIZADO'
  }
  
  export interface InfoSubmission {
    informacao: string;
    localVisto: string;
    dataVisto: string;
    foto?: File;
  }