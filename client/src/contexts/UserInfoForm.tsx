import * as React from "react";
import {Gender, UserInfo} from "../types/User";
import {InputAdornment, MenuItem, Select, TextField} from "@material-ui/core";
import Gapped from "../components/Gapped";

export interface UserInfoFormProps {
    info: UserInfo;
    onChange: (info: UserInfo) => void;
}

export class UserInfoForm extends React.Component<UserInfoFormProps> {
    render() {
        const {name, gender, weight, height} = this.props.info;

        return (
            <Gapped gap={10} vertical>
                <TextField
                    id="name"
                    type="text"
                    label="Имя"
                    value={name}
                    name="name"
                    onChange={e => this.handleChange("name", e.target.value)}
                />
                <TextField
                    label="Вес"
                    type="number"
                    value={weight}
                    name="weight"
                    onChange={e => this.handleChange("weight", Number(e.target.value))}
                    InputProps={{
                        startAdornment: <InputAdornment position="start">Кг</InputAdornment>,
                    }}
                />
                <TextField
                    label="Рост"
                    type="number"
                    name="height"
                    value={height}
                    onChange={e => this.handleChange("height", Number(e.target.value))}
                    InputProps={{
                        startAdornment: <InputAdornment position="start">Метр</InputAdornment>,
                    }}
                />
                <Select
                    value={gender}
                    onChange={e => this.handleChange("gender", Number(e.target.value))}
                >
                    <MenuItem value={Gender.Male}>
                        Мужской
                    </MenuItem>
                    <MenuItem value={Gender.Female}>
                        Женский
                    </MenuItem>
                </Select>
            </Gapped>
        );
    }

    private handleChange = <TKey extends keyof UserInfo>(key: TKey, value: UserInfo[TKey]) => {
        this.props.onChange({...this.props.info, [key]: value});
    }
}
