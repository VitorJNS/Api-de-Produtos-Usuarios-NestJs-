import { Injectable } from "@nestjs/common";
import { ProdutoEntity } from "./produto.entity";
import { AtualizaProdutoDTO } from "./dto/AtualizaProduto.dto";

@Injectable()
export class ProdutoRepository {

    private produtos: ProdutoEntity[] = [];

    async salvarProduto(produto: ProdutoEntity) {
        this.produtos.push(produto);
        return produto;
    }

    async listarProdutos() {
        return this.produtos;
    }

    private buscarPorId(id: string) {
        const possivelProduto = this.produtos.find(produtoSalvo => produtoSalvo.id === id);

        if(!possivelProduto) {
            throw new Error("Produto inexistente");
        }

        return possivelProduto;
    }

    async atualizar(id: string, dadosAtualizacao: Partial<ProdutoEntity>) {
        const produto = this.buscarPorId(id);

        Object.entries(dadosAtualizacao).forEach(([chave, valor]) => {
            if(chave === "id"){
                return;
            }

            produto[chave] = valor;
        });

        return produto;
    }

    async remover(id: string) {
        const produto = this.buscarPorId(id);
        this.produtos = this.produtos.filter(
            produtoSalvo => produtoSalvo.id !== id
        );

        return produto;
    }

    
}