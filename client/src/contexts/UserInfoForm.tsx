import * as React from "react";
import {Gender, UserInfo} from "../types/User";

export interface UserInfoFormProps {
    info: UserInfo;
    onChange: (info: UserInfo) => void;
}

export class UserInfoForm extends React.Component<UserInfoFormProps> {
    render() {
        const { name, gender, weight, height } = this.props.info;

        return (
            <div>
                <form>
                    <p>
                        <label htmlFor="name">Имя</label>
                        <input
                            id="name"
                            type="text"
                            value={name}
                            name="name"
                            onChange={e => this.handleChange("name", e.target.value)}
                        />
                    </p>
                    <p>
                        <label htmlFor="weight">Масса</label>
                        <input
                            id="weight"
                            type="number"
                            min={0}
                            value={weight}
                            name="weight"
                            onChange={e => this.handleChange("weight", Number(e.target.value))}
                        />
                    </p>
                    <p>
                        <label htmlFor="height">Рост</label>
                        <input
                            id="height"
                            type="number"
                            min={0}
                            name="height"
                            value={height}
                            onChange={e => this.handleChange("height", Number(e.target.value))}
                        />
                    </p>
                    <fieldset>
                        <legend>Пол</legend>

                        <input
                            type="radio"
                            name="sex"
                            id="male"
                            value="male"
                            checked={gender === Gender.Male}
                            onChange={() => this.handleChange("gender", Gender.Male)}
                        />
                        <label htmlFor="male">М</label>

                        <input
                            type="radio"
                            name="sex"
                            id="female"
                            value="female"
                            checked={gender === Gender.Female}
                            onChange={() => this.handleChange("gender", Gender.Female)}
                        />
                        <label htmlFor="female">Ж</label>
                    </fieldset>
                </form>
            </div>
        );
    }

    private handleChange = <TKey extends keyof UserInfo>(key: TKey, value: UserInfo[TKey]) => {
        this.props.onChange({...this.props.info, [key]: value});
    }
}
