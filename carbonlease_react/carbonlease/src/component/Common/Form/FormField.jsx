import {
    DatePickerWrapper,
    FieldError,
    FieldGroup,
    FieldInput,
    FieldLabel,
    FieldSelect,
    FieldTextarea,
    FileInputLabel,
    FileInputWrapper,
    HiddenFileInput,
    SwitchWrapper,
    SwitchInput,
    SwitchLabel
} from './FormField.styled';

const FormField = ({
    label,
    type = 'text',
    name,
    value,
    onChange,
    error,
    required = false,
    placeholder = '',
    options = [],
    rows = 5,
    accept = '',
    fileName = '',
}) => {
    const renderInput = () => {
        switch (type) {
            case 'textarea':
                return (
                    <FieldTextarea
                        name={name}
                        value={value}
                        onChange={onChange}
                        placeholder={placeholder}
                        rows={rows}
                        $error={!!error}
                    />
                );
            
            case 'select':
                return (
                    <FieldSelect
                        name={name}
                        value={value}
                        onChange={onChange}
                        $error={!!error}
                    >
                        <option value="">선택하세요</option>
                        {options.map((option, index) => (
                            <option key={index} value={option.value}>
                                {option.label}
                            </option>
                        ))}
                    </FieldSelect>
                );
            
            case 'file':
                return (
                    <FileInputWrapper>
                    <HiddenFileInput
                        type="file"
                        id={name}
                        name={name}
                        onChange={onChange}
                        accept={accept}
                        multiple={true}
                    />
                    <FileInputLabel htmlFor={name} $error={!!error}>
                        <i className="fas fa-upload"></i>
                           {(() => {
                                if (!fileName) return '파일 선택';
                                if (Array.isArray(fileName)) return fileName.join(', ');
                                return fileName;
                            })()}
                    </FileInputLabel>

                    {/* 이미지 미리보기 */}
                    {typeof imageUrl === 'string' && imageUrl && (
                        <div style={{ marginTop: '0.5rem' }}>
                        <img
                            src={imageUrl}
                            alt="미리보기"
                            style={{
                            maxWidth: 180,
                            maxHeight: 120,
                            borderRadius: 8,
                            border: '1px solid #eee'
                            }}
                        />
                        </div>
                    )}
                    </FileInputWrapper>
                );

            
            case 'date':
                return (
                    <DatePickerWrapper>
                        <FieldInput
                            type="date"
                            name={name}
                            value={value}
                            onChange={onChange}
                            placeholder={placeholder}
                            $error={!!error}
                        />
                    </DatePickerWrapper>
                );
            
           case 'toggle-switch':
                return (
                    <SwitchWrapper>
                        <SwitchInput
                            type="checkbox"
                            id={name}
                            name={name}
                            checked={!!value}
                            onChange={(e) =>
                                onChange({
                                    target: {
                                        name,
                                        value: e.target.checked   // boolean
                                    }
                                })
                            }
                        />

                        <SwitchLabel htmlFor={name} $checked={!!value} />
                    </SwitchWrapper>
                );



            default:
                return (
                    <FieldInput
                        type={type}
                        name={name}
                        value={value}
                        onChange={onChange}
                        placeholder={placeholder}
                        $error={!!error}
                    />
                );
        }
    };

    return (
        <FieldGroup>
            <FieldLabel>
                {label}
                {required && <span style={{ color: '#dc3545', marginLeft: '0.25rem' }}>*</span>}
            </FieldLabel>
            {renderInput()}
            {error && <FieldError>{error}</FieldError>}
        </FieldGroup>
    );
};

export default FormField;
