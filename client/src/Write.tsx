import { Component } from "react";
import Axios from "axios";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

interface IProps {
    isModifyMode: boolean;
    id: number;
    handleCancel: any;
}

/**
 * Write class
 * @param {SS} e
 */
class Write extends Component<IProps> {
    /**
     * @param {SS} props
     */
    constructor(props: any) {
        super(props);
        this.state = {
            name: "",
            location: "",
            isRendered: false,
        };
    }

    state = {
        name: "",
        location: "",
        isRendered: false,
    };

    write = () => {
        Axios.post("http://localhost:3001/boards/insert", {
            name: this.state.name,
            location: this.state.location,
        })
            .then((res) => {
                this.setState({
                    name: "",
                    location: "",
                });
                this.props.handleCancel();
            })
            .catch((e) => {
                console.error(e);
            });
    };

    update = () => {
        Axios.post("http://localhost:3001/boards/update", {
            name: this.state.name,
            location: this.state.location,
            id: this.props.id,
        })
            .then((res) => {
                this.setState({
                    name: "",
                    location: "",
                });
                this.props.handleCancel();
            })
            .catch((e) => {
                console.error(e);
            });
    };

    detail = () => {
        Axios.get(`http://localhost:3001/boards?id=${this.props.id}`)
            .then((res) => {
                if (res.data.length > 0) {
                    this.setState({
                        name: res.data[0].name,
                        location: res.data[0].location,
                    });
                }
            })
            .catch((e) => {
                console.error(e);
            });
    };

    handleChange = (e: any) => {
        this.setState({
            [e.target.name]: e.target.value,
        });
    };

    /**
     *
     * @param {any} prevProps
     */
    componentDidUpdate = (prevProps: any) => {
        if (this.props.isModifyMode && this.props.id != prevProps.boardId) {
            this.detail();
        }
    };

    /**
     * @return {Component} Component
     */
    render() {
        return (
            <div>
                <Form>
                    <Form.Group className="mb-3">
                        <Form.Label>이름</Form.Label>
                        <Form.Control
                            type="text"
                            name="name"
                            value={this.state.name}
                            onChange={this.handleChange}
                            placeholder="이름을 입력하세요"
                        />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>국가</Form.Label>
                        <Form.Control
                            type="text"
                            name="location"
                            value={this.state.location}
                            onChange={this.handleChange}
                            placeholder="국가를 입력하세요"
                        />
                    </Form.Group>
                </Form>
                <Button variant="info" onClick={this.props.isModifyMode ? this.update : this.write}>
                    작성완료
                </Button>
                <Button variant="secondary" onClick={this.props.handleCancel}>
                    취소
                </Button>
            </div>
        );
    }
}

export default Write;