import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ProdutoRepository } from './produto.repository';
import { CriaProdutoDTO } from '../produto/dto/CriaProduto.dto';
import { ProdutoEntity } from './produto.entity';
import { randomUUID } from 'crypto';
import { AtualizaProdutoDTO } from './dto/AtualizaProduto.dto';

@Controller('produtos')
export class ProdutoController {
  constructor(private produtoRepository: ProdutoRepository) {}

  @Post()
  async criarProduto(@Body() dadosDoProduto: CriaProdutoDTO) {
    const produto = new ProdutoEntity();

    produto.id = randomUUID();
    produto.nome = dadosDoProduto.nome;
    produto.valor = dadosDoProduto.valor;
    produto.quantidade = dadosDoProduto.quantidade;
    produto.descricao = dadosDoProduto.descricao;
    produto.categoria = dadosDoProduto.categoria;
    produto.caracteristicas = dadosDoProduto.caracteristicas;
    produto.imagens = dadosDoProduto.imagens;

    const produtoCadastrado = this.produtoRepository.salvarProduto(produto);
    return produtoCadastrado;
  };

  @Get()
  async listarTodosOsProdutos() {
    return this.produtoRepository.listarProdutos();
  }

  @Put('/:id')
  async atualizarProduto(@Param('id') id: string, @Body() dadosAtualizacao: AtualizaProdutoDTO) {
    const produtoAtualizado = await this.produtoRepository.atualizar(id, dadosAtualizacao);

    return {
        produto: produtoAtualizado,
        message: "Produto atualizado com sucesso!"
    }
  }

  @Delete('/:id')
  async removerProduto(@Param('id') id: string) {
    const produtoRemovido = await this.produtoRepository.remover(id);

    return {
        produto: produtoRemovido,
        message: "Produto removido com sucesso!"
    }
  }
}
