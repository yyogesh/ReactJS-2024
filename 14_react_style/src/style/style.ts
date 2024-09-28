import styled from "styled-components";

interface ButtonProps {
    primary?: boolean;
    size?: 'small' | 'medium' | 'large'
}

export const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;

export const Button = styled.button<ButtonProps>`
background-color: ${props => props.primary ? '#007bff' : '#6c757d'};
color: white;
font-size: ${props => props.size === 'large' ? '1.2rem' : '1rem'};
padding: ${props => props.size === 'large' ? '12px 24px' : '8px 16px'};
border: none;
border-radius: 4px;
cursor: pointer;
transition: opacity 0.3s ease;

&:hover {
  opacity: 0.8;
}
`;


const Button1 = styled.button<ButtonProps>`
  background-color: ${(props) => (props.primary ? '#007bff' : '#6c757d')};
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  /* Size variations */
  font-size: ${(props) => {
    switch (props.size) {
      case 'small':
        return '12px';
      case 'large':
        return '20px';
      default:
        return '16px';
    }
  }};

  padding: ${(props) => {
    switch (props.size) {
      case 'small':
        return '6px 12px';
      case 'large':
        return '12px 24px';
      default:
        return '8px 16px';
    }
  }};

  &:hover {
    background-color: ${(props) => (props.primary ? '#0056b3' : '#5a6268')};
  }
`;