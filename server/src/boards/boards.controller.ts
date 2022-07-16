import { Body, Controller, Delete, Get, Logger, Param, ParseIntPipe, Patch, Post, UsePipes, ValidationPipe } from "@nestjs/common";
import { Board } from "./boards.Model";
import { BoardsService } from "./boards.service";
import { CreateBoardDto } from "./dto/create-board.dto";

@Controller('boards')
export class BoardsController {
    private logger = new Logger('Boards');
    constructor(private boardsService: BoardsService) { }

    //all list
    @Get()
    getAllBoard(): Promise<Board[]>{
      return this.boardsService.getAllBoards();
    }

    //특정 id list
    @Get('/:id')
    getBoardById(@Param('id') id:number) : Promise<Board> {
      return this.boardsService.getBoardById(id);
    }

    //insert
    @Post('/insert')
    @UsePipes(ValidationPipe)
    createBoard(@Body() createBoardDto: CreateBoardDto): Promise<Board>{
      return this.boardsService.createBoard(createBoardDto);
    }

    //delete
    @Delete('/:id')
    deleteBoard (@Param('id', ParseIntPipe) id: number): Promise<void> {
        return this.boardsService.deleteBoard(id);
    }
    
    // update
    @Patch('/:id/update')
    updateBoard(
        @Param('id', ParseIntPipe) id: number,
        @Body('name') name: string,
    ):Promise<Board>{
        return this.boardsService.updateBoard(id, name);
    }


}