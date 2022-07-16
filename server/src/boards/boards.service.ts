import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateBoardDto } from './dto/create-board.dto';
import { BoardRepository } from './board.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Board } from './board.entity';

@Injectable()
export class BoardsService {
    constructor(
        @InjectRepository(BoardRepository)
        private boardRepository: BoardRepository,
    ) { }

    async getAllBoards(): Promise<Board[]> {
        return this.boardRepository.find();
    }
    
    async getBoardById(id: number): Promise<Board> {
      const found = await this.boardRepository.findOne(id);

      if (!found) {
          throw new NotFoundException(`Can't find Board with id ${id}`);
      }

      return found;
    }

    async createBoard(createBoardDto: CreateBoardDto): Promise<Board> {
      return this.boardRepository.createBoard(createBoardDto);
    }

    async deleteBoard(id: number): Promise<void> {
        const result = await this.boardRepository.delete({id});

        if (result.affected === 0) {
            throw new NotFoundException(`Can't find Board with id ${id}`)
        }
    }

    async updateBoard(id: number, name: string): Promise<Board> {
      const board = await this.getBoardById(id);

      board.name = name;
      
      await this.boardRepository.save(board);

      return board;
  }
}