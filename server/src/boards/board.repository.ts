import { EntityRepository, Repository } from "typeorm";
import { Board } from "./board.entity";
import { CreateBoardDto } from "./dto/create-board.dto";

@EntityRepository(Board)
export class BoardRepository extends Repository<Board> {
    async createBoard(createBoardDto: CreateBoardDto) : Promise<Board> {
        const {name, location} = createBoardDto;

        const board = new Board();
        board.name = name;
        board.location = location;
        await this.save(board);
        
        return board;
    }
}