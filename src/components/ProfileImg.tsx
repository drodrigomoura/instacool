import * as React from 'react'
import { reduxForm, InjectedFormProps, Field, WrappedFieldProps, WrappedFieldInputProps } from 'redux-form'

const style = {
    file: {
        display: 'none',
    },
    img: {
        borderRadius: '100%',
        width: '100px',
        height: '100px'
    },
}

const handleChange = (submitProfileImg: () => void, input: WrappedFieldInputProps) => async (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()
    const { onChange } = input
    const { files } = e.target
    if (files) {
        await onChange(files[0])
        submitProfileImg()
    }
}

interface IProfileImg {
    submitProfileImg: () => void,
    profileImage: string
}

const RenderField: React.StatelessComponent<WrappedFieldProps & IProfileImg> = ({ input, submitProfileImg, profileImage }) =>
    <div>
        <input onChange={handleChange(submitProfileImg, input)} style={style.file} type='file' id='profileImage' />
        <label htmlFor='profileImage'>
            <img style={style.img} src={profileImage} alt="profile img" />
        </label>
    </div>

class ProfileImg extends React.Component<InjectedFormProps<{}, IProfileImg> & IProfileImg> {
    public render() {
        const { handleSubmit, submitProfileImg, profileImage } = this.props
        return (
            <form onSubmit={handleSubmit}>
                <Field
                    profileImage={profileImage}
                    name='file'
                    component={RenderField}
                    submitProfileImg={submitProfileImg}
                />

            </form>
        )
    }
}

export default reduxForm<{}, IProfileImg>({
    form: 'profileImg'
})(ProfileImg)