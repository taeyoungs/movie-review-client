import React from 'react';
import styled from '@emotion/styled';
import Icon from 'Icon/Icon';

const FooterContainer = styled.footer`
  width: 100%;
  background-color: #1f1f1f;
`;

const Section = styled.section`
  padding: 25px 0 43px;
`;

const FooterContent = styled.div`
  display: flex;
  margin-left: 20px;
  margin-right: 20px;
  max-width: 1320px;
  @media (min-width: 760px) {
    margin: 0 3.5%;
  }
  @media (min-width: 1100px) {
    margin: 0 60px;
  }
  @media (min-width: 1440px) {
    margin-right: auto;
    margin-left: auto;
  }
`;

const FooterContentLeft = styled.div`
  flex: 1;
`;

const FooterContentRight = styled.div``;

const Wrapper = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  align-items: flex-end;
`;

const IconList = styled.ul`
  display: flex;
  align-items: center;
  & svg {
    margin-top: 2px;
    &:hover {
      fill: #e5e5e5;
    }
  }
  & li:nth-of-type(2) button {
    &:hover {
      background: #e5e5e5;
    }
  }
`;

const IconListItem = styled.li`
  padding-left: 15px;
`;

const ContactList = styled.ul`
  margin-top: 10px;
  line-height: 22px;
  letter-spacing: -0.3px;
  font-size: 13px;
  color: #e5e5e5;
  & li:nth-of-type(1) {
    &:after {
      content: '';
      display: inline-block;
      width: 1px;
      margin: 4px 8px -2px;
      height: 12px;
      background: #e5e5e5;
    }
  }
`;

const ContactListItem = styled.li`
  display: inline-block;
`;

const LicenseList = styled.ul`
  margin-top: 10px;
  line-height: 22px;
  letter-spacing: -0.3px;
  font-size: 13px;
  color: #a5a5a7;

  & li:nth-of-type(1) {
    &:after {
      content: '';
      display: inline-block;
      width: 1px;
      margin: 4px 8px -2px;
      height: 12px;
      background: #a5a5a7;
    }
  }
`;

const LicenseListItem = styled.li`
  display: inline-block;
`;

const InfoList = styled.ul`
  margin-top: 10px;
  line-height: 22px;
  letter-spacing: -0.3px;
  font-size: 13px;
  color: #e5e5e5;
  display: flex;
  align-items: center;
  & svg {
    height: 15px;
  }
`;

const InfoListItem = styled.li`
  display: inline-block;
  padding-left: 5px;
`;

const BlogIcon = styled.button`
  border: none;
  border-radius: 50%;
  background: #a5a5a7;
  color: #1f1f1f;
  width: 25px;
  height: 25px;
  cursor: pointer;
  font-weight: 700;
  outline: none;
`;

const Footer: React.FunctionComponent = () => {
  return (
    <FooterContainer>
      <Section>
        <FooterContent>
          <FooterContentLeft>
            <ContactList>
              <ContactListItem>연락처</ContactListItem>
              <ContactListItem>
                xoxodudwkd@gmail.com, 010-2053-9453
              </ContactListItem>
            </ContactList>
            <LicenseList>
              <ContactListItem>License</ContactListItem>
              <LicenseListItem>icon made by Feepik, iconmonstr</LicenseListItem>
            </LicenseList>
            <InfoList>
              <Icon icon="logo" size={50} />
              <InfoListItem>
                © 2021 by 장태영, Inc. All rights reserved.
              </InfoListItem>
            </InfoList>
          </FooterContentLeft>
          <FooterContentRight>
            <Wrapper>
              <IconList>
                <IconListItem>
                  <a href="https://github.com/taeyoungs" target="_blank">
                    <Icon icon="github" color="#a5a5a7" size={30} />
                  </a>
                </IconListItem>
                <IconListItem>
                  <a href="https://youngslog.medium.com/" target="_blank">
                    <BlogIcon>B</BlogIcon>
                  </a>
                </IconListItem>
              </IconList>
            </Wrapper>
          </FooterContentRight>
        </FooterContent>
      </Section>
    </FooterContainer>
  );
};

export default React.memo(Footer);
