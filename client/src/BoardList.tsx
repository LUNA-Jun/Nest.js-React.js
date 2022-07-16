import { Component } from "react";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import Axios from "axios";

/* Test
    const submitTest = () => {
    Axios.get("http://localhost:3001/boards", {}).then(() => {
        alert("등록");
    });
};*/


const Board = ({
    id,
    name,
    location,
    props,
}: {
    id: number;
    name: string;
    location: string;
    props: any;
}) => {
    return (
        <tr>
            <td>
                <input
                    type="checkbox"
                    value={id}
                    onChange={(e) => {
                        props.onCheckboxChange(e.currentTarget.checked, e.currentTarget.value);
                    }}
                ></input>
            </td>
            <td>{id}</td>
            <td>{name}</td>
            <td>{location}</td>
        </tr>
    );
};

interface IProps {
    isComplete: boolean;
    handleModify: any;
    renderComplete: any;
}

/**
 * BoardList class
 * @param {SS} e
 */
class BoardList extends Component<IProps> {
    /**
     * @param {SS} props
     */
    constructor(props: any) {
        super(props);
        this.state = {
            boardList: [],
            checkList: [],
        };
    }

    state = {
        boardList: [],
        checkList: [],
    };

    getList = () => {
        Axios.get("http://localhost:3001/boards", {})
            .then((res) => {
                const { data } = res;
                this.setState({
                    boardList: data,
                });
                this.props.renderComplete();
            })
            .catch((e) => {
                console.error(e);
            });
    };

    /**
     * @param {boolean} checked
     * @param {any} id
     */
    onCheckboxChange = (checked: boolean, id: any) => {
        const list: Array<string> = this.state.checkList.filter((v) => {
            return v != id;
        });

        if (checked) {
            list.push(id);
        }

        this.setState({
            checkList: list,
        });
    };

    componentDidMount() {
        this.getList();
    }

    componentDidUpdate() {
        if (!this.props.isComplete) {
            this.getList();
        }
    }

    handleDelete = () => {
        if (this.state.checkList.length == 0) {
            alert("삭제할 게시글을 선택하세요.");
            return;
        }
    
        let boardIdList = "";
    
        this.state.checkList.forEach((v: any) => {
            boardIdList += `'${v}',`;
        });
    
        Axios.delete(`http://localhost:3001/boards/${boardIdList}}`)
            .then(() => {
                this.getList();
            })
            .catch((e) => {
                console.error(e);
            });
    };
    

    /**
     * @return {Component} Component
     */
    render() {
        const { boardList }: { boardList: any } = this.state;

        return (
            <div>
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>선택</th>
                            <th>번호</th>
                            <th>이름</th>
                            <th>나라</th>
                        </tr>
                    </thead>
                    <tbody>
                        {boardList.map((v: any) => {
                            return (
                                <Board
                                    id={v.id}
                                    name={v.name}
                                    location={v.location}
                                    key={v.id}
                                    props={this}
                                />
                            );
                        })}
                    </tbody>
                </Table>
                <Button
                    variant="secondary"
                    onClick={() => {
                        this.props.handleModify(this.state.checkList);
                    }}
                >수정하기</Button>
                <Button variant="danger" onClick={this.handleDelete}>삭제하기</Button>
            </div>
        );
    }
}

export default BoardList;